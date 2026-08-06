"use server";

import { revalidatePath } from "next/cache";
import { requireCoachId } from "@/lib/auth/session";
import { createDataClient } from "@/lib/supabase/data";

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

  const coachId = await requireCoachId();
  const supabase = createDataClient();

  // checkins has no coach_id column of its own (only client_id) -- verify
  // clientId belongs to this coach first, same ownership check as the
  // client detail page, then scope the update to that client_id too so an
  // attacker-supplied checkinId from a different client/coach can't be
  // paired with a clientId they do own to write into someone else's row.
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("id", clientId)
    .eq("coach_id", coachId)
    .single();

  if (!client) {
    return { error: "Client not found." };
  }

  const { error } = await supabase
    .from("checkins")
    .update({ coach_reply: reply, reply_sent_at: new Date().toISOString() })
    .eq("id", checkinId)
    .eq("client_id", clientId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/clients/${clientId}`);
  return {};
}
