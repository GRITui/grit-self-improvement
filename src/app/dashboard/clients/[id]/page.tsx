import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { computeStreak } from "@/lib/streak";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { CheckinCard } from "@/components/dashboard/checkin-card";
import type { Checkin, Client } from "@/lib/types";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single<Client>();

  if (!client) {
    notFound();
  }

  const { data: checkins } = await supabase
    .from("checkins")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false })
    .returns<Checkin[]>();

  const rows = checkins ?? [];
  const streak = computeStreak(
    client.cadence,
    rows.map((c) => new Date(c.created_at))
  );
  const latestRisk = rows[0]?.risk_level ?? null;

  return (
    <div className="flex flex-1 flex-col bg-ink-50 px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          &lt; Back to dashboard
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-ink-800">
            {client.name}
          </h1>
          <RiskBadge risk={latestRisk} />
          <span className="text-sm text-ink-500">
            {streak} check-in streak
          </span>
        </div>

        <h2 className="mt-8 text-xs font-medium tracking-wide text-ink-500 uppercase">
          Check-in history
        </h2>

        {rows.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-ink-300 p-8 text-center">
            <p className="text-sm text-ink-500">
              No check-ins yet — share {client.name}&apos;s invite link to get
              started.
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {rows.map((checkin, index) => (
              <CheckinCard
                key={checkin.id}
                checkin={checkin}
                clientId={client.id}
                defaultExpanded={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
