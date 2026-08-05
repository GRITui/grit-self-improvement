"use server";

import { createClient } from "@/lib/supabase/server";

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
  const answers = questions.map((question, index) => ({
    question,
    answer: String(formData.get(`answer-${index}`) ?? "").trim(),
  }));

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_checkin", {
    token,
    answers,
  });

  if (error) {
    return {
      error:
        "We couldn't submit your check-in. This link may no longer be active — please contact your coach for a new one.",
    };
  }

  return { success: true };
}
