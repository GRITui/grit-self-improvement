import Link from "next/link";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { createDataClient } from "@/lib/supabase/data";
import { AddClientForm } from "@/components/clients/add-client-form";
import { ClientRow } from "@/components/clients/client-row";
import type { Client } from "@/lib/types";

export default async function ClientsPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/login");
  }

  const supabase = createDataClient();
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .eq("coach_id", user.id)
    .is("archived_at", null)
    .order("created_at", { ascending: false })
    .returns<Client[]>();

  const checkinBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <div className="flex flex-1 flex-col bg-ink-50 px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            &lt; Back to dashboard
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-ink-800">Clients</h1>
        <p className="mt-1 text-sm text-ink-500">
          Add clients and share their check-in link — no login required on
          their end.
        </p>

        <div className="mt-6">
          <AddClientForm />
        </div>

        {error && (
          <p className="mt-6 text-sm text-danger">{error.message}</p>
        )}

        {clients && clients.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-ink-300 p-8 text-center text-sm text-ink-500">
            No clients yet — invite your first client to get started.
          </div>
        )}

        {clients && clients.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {clients.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                checkinBaseUrl={checkinBaseUrl}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
