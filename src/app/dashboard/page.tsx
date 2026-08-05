import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";
import { computeStreak, daysAgo } from "@/lib/streak";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import type { Client } from "@/lib/types";

type ClientWithCheckins = Client & {
  checkins: {
    id: string;
    risk_level: "LOW" | "MEDIUM" | "HIGH" | null;
    created_at: string;
  }[];
};

const RISK_ORDER: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: clients } = await supabase
    .from("clients")
    .select("*, checkins(id, risk_level, created_at)")
    .is("archived_at", null)
    .returns<ClientWithCheckins[]>();

  const rows = (clients ?? []).map((client) => {
    const checkinDates = [...client.checkins]
      .sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .map((c) => ({ date: new Date(c.created_at), risk: c.risk_level }));

    const latest = checkinDates[0] ?? null;

    return {
      client,
      streak: computeStreak(
        client.cadence,
        checkinDates.map((c) => c.date)
      ),
      lastCheckin: latest?.date ?? null,
      risk: latest?.risk ?? null,
    };
  });

  rows.sort((a, b) => {
    const riskA = a.risk ? RISK_ORDER[a.risk] : 3;
    const riskB = b.risk ? RISK_ORDER[b.risk] : 3;
    if (riskA !== riskB) return riskA - riskB;
    return (b.lastCheckin?.getTime() ?? 0) - (a.lastCheckin?.getTime() ?? 0);
  });

  return (
    <div className="flex flex-1 flex-col bg-ink-50 px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-ink-800">Dashboard</h1>
            <p className="mt-1 text-sm text-ink-500">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/clients"
              className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100"
            >
              Manage clients
            </Link>
            <Link
              href="/dashboard/billing"
              className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100"
            >
              Billing
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-ink-300 p-8 text-center">
            <p className="text-sm text-ink-500">
              No clients yet — invite your first client to get started.
            </p>
            <Link
              href="/dashboard/clients"
              className="mt-4 inline-block rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              + Invite Client
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 hidden overflow-hidden rounded-lg border border-ink-200 bg-white shadow-sm sm:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-ink-200 bg-ink-50 text-xs font-medium tracking-wide text-ink-500 uppercase">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Streak</th>
                    <th className="px-4 py-3">Last check-in</th>
                    <th className="px-4 py-3">Risk</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ client, streak, lastCheckin, risk }) => (
                    <tr
                      key={client.id}
                      className={
                        risk === "HIGH" ? "bg-risk-high-bg/40" : undefined
                      }
                    >
                      <td className="px-4 py-3 font-medium text-ink-800">
                        <Link
                          href={`/dashboard/clients/${client.id}`}
                          className="hover:text-brand-600"
                        >
                          {client.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 tabular-nums text-ink-600">
                        {streak} check-in streak
                      </td>
                      <td className="px-4 py-3 text-ink-600">
                        {lastCheckin ? daysAgo(lastCheckin) : "No check-ins yet"}
                      </td>
                      <td className="px-4 py-3">
                        <RiskBadge risk={risk} />
                      </td>
                      <td className="px-4 py-3 text-right text-ink-400">
                        <Link href={`/dashboard/clients/${client.id}`}>&gt;</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-8 flex flex-col gap-3 sm:hidden">
              {rows.map(({ client, streak, lastCheckin, risk }) => (
                <li key={client.id}>
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="block rounded-lg border border-ink-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-ink-800">{client.name}</p>
                      <RiskBadge risk={risk} />
                    </div>
                    <p className="mt-1 text-sm text-ink-500">
                      {streak} check-in streak &middot;{" "}
                      {lastCheckin ? daysAgo(lastCheckin) : "No check-ins yet"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
