"use server";

import { revalidatePath } from "next/cache";
import { requireCoachId as requireCoachIdFromSession } from "@/lib/auth/session";
import { createDataClient } from "@/lib/supabase/data";
import { getEffectivePlan, getClientLimit } from "@/lib/billing";
import type { Coach } from "@/lib/types";

export type ClientFormState = {
  error?: string;
};

async function requireCoachId() {
  const coachId = await requireCoachIdFromSession();
  return { supabase: createDataClient(), coachId };
}

export async function addClient(
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name) {
    return { error: "Client name is required." };
  }

  const { supabase, coachId } = await requireCoachId();

  const { data: coach } = await supabase
    .from("coaches")
    .select("*")
    .eq("id", coachId)
    .single<Coach>();

  if (coach) {
    const limit = getClientLimit(getEffectivePlan(coach));
    const { count } = await supabase
      .from("clients")
      .select("id", { count: "exact", head: true })
      .eq("coach_id", coachId)
      .is("archived_at", null);

    if ((count ?? 0) >= limit) {
      return {
        error:
          "You've reached your plan's client limit. Upgrade your plan to add more clients.",
      };
    }
  }

  const { error } = await supabase.from("clients").insert({
    coach_id: coachId,
    name,
    email: email || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return {};
}

export async function updateClient(
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!id || !name) {
    return { error: "Client name is required." };
  }

  const { supabase, coachId } = await requireCoachId();

  // Explicit coach_id filter -- Supabase RLS (auth.uid() = coach_id) used
  // to be the only thing stopping a coach from updating another coach's
  // client here; that no longer authenticates anything now that sessions
  // are Neon Auth sessions, so this filter is now the actual enforcement.
  // See src/lib/supabase/data.ts.
  const { error } = await supabase
    .from("clients")
    .update({ name, email: email || null })
    .eq("id", id)
    .eq("coach_id", coachId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return {};
}

const CADENCE_OPTIONS = ["weekly", "biweekly", "monthly"] as const;

export async function updateProgram(
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const id = String(formData.get("id") ?? "");
  const cadence = String(formData.get("cadence") ?? "");
  const questions = (
    JSON.parse(String(formData.get("questions") ?? "[]")) as string[]
  )
    .map((question) => question.trim())
    .filter(Boolean);

  if (!id) {
    return { error: "Missing client." };
  }

  if (!CADENCE_OPTIONS.includes(cadence as (typeof CADENCE_OPTIONS)[number])) {
    return { error: "Invalid cadence." };
  }

  if (questions.length < 1 || questions.length > 5) {
    return { error: "Choose between 1 and 5 questions." };
  }

  const { supabase, coachId } = await requireCoachId();

  const { error } = await supabase
    .from("clients")
    .update({ cadence, questions })
    .eq("id", id)
    .eq("coach_id", coachId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return {};
}

export async function removeClient(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase, coachId } = await requireCoachId();

  await supabase
    .from("clients")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", id)
    .eq("coach_id", coachId);

  revalidatePath("/dashboard/clients");
}
