import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col bg-ink-50 px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-ink-800">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              Signed in as {user.email}
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100"
            >
              Sign out
            </button>
          </form>
        </div>

        <Link
          href="/dashboard/clients"
          className="mt-8 flex items-center justify-between rounded-lg border border-ink-200 bg-white p-6 shadow-sm transition-colors hover:bg-ink-50"
        >
          <div>
            <p className="text-lg font-medium text-ink-800">Clients</p>
            <p className="mt-1 text-sm text-ink-500">
              Manage your client roster and invite links.
            </p>
          </div>
          <span className="text-ink-400">&gt;</span>
        </Link>
      </div>
    </div>
  );
}
