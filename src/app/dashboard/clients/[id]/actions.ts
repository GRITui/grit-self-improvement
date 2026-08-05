"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ReplyFormState = {
  error?: string;
};

export async function saveCoachReply(
  clientId: string,
  _prevState: ReplyFormState,
  formData: FormData
): Promise<ReplyFormState> {
  const checkinId = String(formData.get("checkinId") ?? "");
  const reply = String(formData.get("reply") ?? "").trim();

  if (!checkinId || !reply) {
    return { error: "Reply can't be empty." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("checkins")
    .update({ coach_reply: reply, reply_sent_at: new Date().toISOString() })
    .eq("id", checkinId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/clients/${clientId}`);
  return {};
}
