"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getEffectivePlan, getClientLimit } from "@/lib/billing";
import type { Coach } from "@/lib/types";

export type ClientFormState = {
  error?: string;
};

async function requireCoachId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, coachId: user.id };
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

  const { supabase } = await requireCoachId();

  const { error } = await supabase
    .from("clients")
    .update({ name, email: email || null })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return {};
}

export async function removeClient(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireCoachId();

  await supabase
    .from("clients")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/dashboard/clients");
}
