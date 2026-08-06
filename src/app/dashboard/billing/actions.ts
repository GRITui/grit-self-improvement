"use server";

import { redirect } from "next/navigation";
import { requireCoachId } from "@/lib/auth/session";
import { createDataClient } from "@/lib/supabase/data";
import { getStripe } from "@/lib/stripe";
import { PLAN_TIERS, type PlanTier } from "@/lib/billing";
import type { Coach } from "@/lib/types";

async function requireCoach() {
  const coachId = await requireCoachId();
  const supabase = createDataClient();

  const { data: coach } = await supabase
    .from("coaches")
    .select("*")
    .eq("id", coachId)
    .single<Coach>();

  if (!coach) {
    redirect("/login");
  }

  return { supabase, coachId, coach };
}

export async function startCheckout(planId: PlanTier["id"]) {
  const tier = PLAN_TIERS.find((t) => t.id === planId);
  if (!tier) return;

  const { supabase, coachId, coach } = await requireCoach();
  const stripe = getStripe();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const priceId = process.env[tier.priceEnvVar];

  if (!priceId) {
    redirect(
      `/dashboard/billing?error=${encodeURIComponent(
        "This plan isn't configured yet. Contact support."
      )}`
    );
  }

  let customerId = coach.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: coach.email,
      metadata: { coach_id: coachId },
    });
    customerId = customer.id;
    await supabase
      .from("coaches")
      .update({ stripe_customer_id: customerId })
      .eq("id", coachId);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard/billing?success=true`,
    cancel_url: `${origin}/dashboard/billing`,
    metadata: { coach_id: coachId },
  });

  if (session.url) {
    redirect(session.url);
  }
}

export async function openBillingPortal() {
  const { coach } = await requireCoach();

  if (!coach.stripe_customer_id) {
    redirect("/dashboard/billing");
  }

  const stripe = getStripe();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: coach.stripe_customer_id,
    return_url: `${origin}/dashboard/billing`,
  });

  redirect(session.url);
}
