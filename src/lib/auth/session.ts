import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { createDataClient } from "@/lib/supabase/data";

/**
 * Current signed-in coach, or null. Thin wrapper so call sites don't need
 * to import stackServerApp directly.
 */
export async function getCurrentUser() {
  return stackServerApp.getUser();
}

/**
 * Server Action / Server Component guard: returns the coach's stable Neon
 * Auth user id, or redirects to /login if there's no session. This id is
 * what coaches.id (and everything that foreign-keys to it) is keyed off
 * of -- see the TSK-020 migration note in
 * supabase/migrations/00000000000008_coaches_neon_auth.sql.
 */
export async function requireCoachId(): Promise<string> {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/login");
  }

  return user.id;
}

/**
 * Coach rows used to be created by a Postgres trigger on Supabase's
 * internal auth.users table (on_auth_user_created ->
 * public.handle_new_coach()). Neon Auth doesn't write into this Supabase
 * database at all, so there's no table for a trigger to fire on anymore --
 * the app now creates the row itself, idempotently, the first time an
 * authenticated coach is seen. This covers both a fresh email/password
 * signup and a client's very first Google OAuth sign-in: Stack Auth
 * auto-creates the auth-side identity for both cases, so there is no
 * single "signup just happened" hook to key off of the way Supabase's
 * trigger could.
 *
 * Called from the /dashboard layout on every authenticated request; the
 * upsert with ignoreDuplicates is a no-op (one indexed lookup) for
 * existing coaches, so this is cheap enough to not need a separate
 * "first login" flag.
 */
export async function ensureCoachRow(coachId: string, email: string | null) {
  if (!email) {
    // Extremely rare (a provider that doesn't return an email at all) --
    // the coaches.email column is NOT NULL, so there's nothing sane to
    // upsert. Leave the row absent; dashboard queries that depend on a
    // coaches row will redirect back through requireCoachId's callers.
    return;
  }

  const supabase = createDataClient();
  const { error } = await supabase
    .from("coaches")
    .upsert({ id: coachId, email }, { onConflict: "id", ignoreDuplicates: true });

  if (error) {
    console.error("Failed to ensure coaches row for", coachId, error);
  }
}
