import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PLAN_TIERS, getEffectivePlan, getClientLimit } from "@/lib/billing";
import { startCheckout, openBillingPortal } from "./actions";
import type { Coach } from "@/lib/types";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: coach } = await supabase
    .from("coaches")
    .select("*")
    .eq("id", user.id)
    .single<Coach>();

  if (!coach) {
    redirect("/login");
  }

  const { count: activeClientCount } = await supabase
    .from("clients")
    .select("id", { count: "exact", head: true })
    .eq("coach_id", user.id)
    .is("archived_at", null);

  const effectivePlan = getEffectivePlan(coach);
  const clientLimit = getClientLimit(effectivePlan);
  const trialDaysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(coach.trial_ends_at).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="flex flex-1 flex-col bg-ink-50 px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          &lt; Back to dashboard
        </Link>

        <h1 className="mt-6 text-2xl font-semibold text-ink-800">Billing</h1>

        {success && (
          <p className="mt-4 rounded-md bg-risk-low-bg px-4 py-3 text-sm text-risk-low">
            Subscription updated. Thanks!
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-md bg-risk-high-bg px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}

        <div className="mt-4 rounded-lg border border-ink-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink-500">Current plan</p>
          <p className="mt-1 text-lg font-medium text-ink-800 capitalize">
            {effectivePlan === "blocked" ? "No active plan" : effectivePlan}
          </p>
          {effectivePlan === "trialing" && (
            <p className="mt-1 text-sm text-ink-500">
              {trialDaysLeft} day{trialDaysLeft === 1 ? "" : "s"} left in your
              free trial.
            </p>
          )}
          {effectivePlan === "blocked" && (
            <p className="mt-1 text-sm text-danger">
              Your trial has ended. Pick a plan below to keep adding clients.
            </p>
          )}
          <p className="mt-2 text-sm text-ink-500">
            {activeClientCount ?? 0} / {clientLimit === Infinity ? "unlimited" : clientLimit}{" "}
            active clients
          </p>

          {coach.stripe_customer_id && (
            <form action={openBillingPortal} className="mt-4">
              <button
                type="submit"
                className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                Manage subscription
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PLAN_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col rounded-lg border border-ink-200 bg-white p-6 shadow-sm"
            >
              <p className="text-lg font-medium text-ink-800">{tier.name}</p>
              <p className="mt-1 text-2xl font-semibold text-ink-800">
                {tier.priceLabel}
              </p>
              <p className="mt-2 text-sm text-ink-500">
                Up to{" "}
                {tier.clientLimit === Infinity
                  ? "unlimited"
                  : tier.clientLimit}{" "}
                active clients
              </p>
              <form action={startCheckout.bind(null, tier.id)} className="mt-4">
                <button
                  type="submit"
                  disabled={effectivePlan === tier.id}
                  className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
                >
                  {effectivePlan === tier.id ? "Current plan" : "Choose plan"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
