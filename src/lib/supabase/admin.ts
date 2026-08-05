import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client that bypasses RLS. Only ever use this from trusted
// server contexts with no coach session to authenticate as (e.g. the
// Stripe webhook handler, which needs to update a coach's row by
// stripe_customer_id rather than by an authenticated auth.uid()).
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
