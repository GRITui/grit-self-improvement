import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { ensureCoachRow } from "@/lib/auth/session";

// Authoritative session guard for every /dashboard/* page (the middleware
// check in src/lib/auth/middleware.ts is a fast-path backstop, not the
// only enforcement). Also the one place that creates a coach's `coaches`
// row on first sight -- see ensureCoachRow's doc comment for why that can
// no longer be a Postgres trigger under Neon Auth. Runs once per page
// navigation; it does NOT run for Server Actions (clients/actions.ts etc.
// each call requireCoachId() themselves for that reason).
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/login");
  }

  await ensureCoachRow(user.id, user.primaryEmail);

  return <>{children}</>;
}
