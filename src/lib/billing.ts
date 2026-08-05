export type StoredPlan = "trialing" | "starter" | "pro" | "studio" | "canceled";
export type EffectivePlan = "trialing" | "starter" | "pro" | "studio" | "blocked";

export type PlanTier = {
  id: "starter" | "pro" | "studio";
  name: string;
  priceLabel: string;
  clientLimit: number;
  priceEnvVar: string;
};

export const PLAN_TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "$29/mo",
    clientLimit: 10,
    priceEnvVar: "STRIPE_PRICE_STARTER",
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "$59/mo",
    clientLimit: 30,
    priceEnvVar: "STRIPE_PRICE_PRO",
  },
  {
    id: "studio",
    name: "Studio",
    priceLabel: "$99/mo",
    clientLimit: Infinity,
    priceEnvVar: "STRIPE_PRICE_STUDIO",
  },
];

// Generous trial ceiling (matches Pro) so a trialing coach can genuinely
// exercise the product, without being literally unlimited.
const TRIAL_CLIENT_LIMIT = 30;

export function getEffectivePlan(coach: {
  plan: string;
  trial_ends_at: string;
}): EffectivePlan {
  if (coach.plan === "trialing") {
    return new Date(coach.trial_ends_at) > new Date() ? "trialing" : "blocked";
  }
  if (coach.plan === "canceled") {
    return "blocked";
  }
  return coach.plan as EffectivePlan;
}

export function getClientLimit(effectivePlan: EffectivePlan): number {
  if (effectivePlan === "trialing") return TRIAL_CLIENT_LIMIT;
  if (effectivePlan === "blocked") return 0;
  const tier = PLAN_TIERS.find((t) => t.id === effectivePlan);
  return tier?.clientLimit ?? 0;
}

export function planIdFromPriceId(priceId: string): PlanTier["id"] | null {
  const tier = PLAN_TIERS.find(
    (t) => process.env[t.priceEnvVar] === priceId
  );
  return tier?.id ?? null;
}
