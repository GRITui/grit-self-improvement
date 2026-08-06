"use server";

import { createPublicClient } from "@/lib/supabase/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { analyzeCheckin } from "@/lib/anthropic";

export type SubmitCheckinState = {
  error?: string;
  success?: boolean;
};

export async function submitCheckin(
  token: string,
  _prevState: SubmitCheckinState,
  formData: FormData
): Promise<SubmitCheckinState> {
  const questions = JSON.parse(String(formData.get("questions") ?? "[]")) as string[];
  const answerTexts = questions.map((_, index) =>
    String(formData.get(`answer-${index}`) ?? "").trim()
  );
  const answers = questions.map((question, index) => ({
    question,
    answer: answerTexts[index],
  }));

  const supabase = createPublicClient();
  const { data: checkinId, error } = await supabase.rpc("submit_checkin", {
    token,
    answers,
  });

  if (error) {
    return {
      error:
        "We couldn't submit your check-in. This link may no longer be active — please contact your coach for a new one.",
    };
  }

  // Best-effort: the check-in is already saved above regardless of whether
  // AI analysis succeeds. A coach missing a summary on one check-in isn't a
  // submission-blocking failure, so any error here is swallowed and logged
  // rather than surfaced to the client.
  try {
    const analysis = await analyzeCheckin(questions, answerTexts);
    const admin = createAdminClient();
    await admin
      .from("checkins")
      .update({
        ai_summary: analysis.summary,
        risk_level: analysis.risk,
        draft_reply: analysis.draft_reply,
        ai_processed_at: new Date().toISOString(),
      })
      .eq("id", checkinId);
  } catch (analysisError) {
    console.error("Check-in AI analysis failed:", analysisError);
  }

  return { success: true };
}
