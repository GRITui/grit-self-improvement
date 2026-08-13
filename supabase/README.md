# Auth + database setup

**Status: transitional (TSK-020 of the TSK-019 Neon migration epic).** Auth
now runs on Neon Auth. The `coaches`/`clients`/`checkins` tables still live
in Supabase Postgres for now -- TSK-021 moves them to Neon Postgres proper.
Once that lands this file should be replaced outright (tracked as
TSK-024); until then, both setups below are required for the app to work.

## 1. Neon Auth setup

Neon Auth is Neon's first-party auth product (built on
[Stack Auth](https://stack-auth.com)).

1. Open your Neon project's **Auth** tab in the Neon console and enable
   Neon Auth (this provisions a Stack Auth project for you). If you'd
   rather not go through Neon for this, a standalone project at
   https://app.stack-auth.com works identically for everything below.
2. Copy the three keys it gives you (Project ID, Publishable Client Key,
   Secret Server Key) into `.env.local`:
   ```
   NEXT_PUBLIC_STACK_PROJECT_ID=
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
   STACK_SECRET_SERVER_KEY=
   ```
3. Under the project's **Auth methods**, enable **Email/password** and
   **Google** OAuth. For Google, you'll need a Google Cloud OAuth client
   (Credentials -> OAuth client ID -> Web application); Stack Auth's
   dashboard shows the exact redirect URI to add to that client's
   "Authorized redirect URIs" (it's on Stack's own domain, not this app's
   -- Stack proxies the OAuth handshake, so no `/auth/callback` route needs
   registering on this app's side, unlike the old Supabase setup).
4. Under **Domains**, add your site's origin(s) (e.g.
   `http://localhost:3000` for local dev, plus your production domain) so
   Stack Auth allows redirecting back to this app after sign-in/sign-up.
   This app's own handler route (`/handler/[...stack]`, wired up in
   `src/app/layout.tsx` + `src/lib/auth/stack.ts`) is what Stack redirects
   through.

No `handle_new_coach` trigger or `auth.users` table is involved anymore --
see `migrations/00000000000008_coaches_neon_auth.sql`. A coach's row in
`public.coaches` is created by the app itself (`ensureCoachRow()` in
`src/lib/auth/session.ts`) the first time an authenticated session is seen,
since Neon Auth doesn't write into this Supabase database to trigger off
of.

## 2. Database (Supabase Postgres, pending TSK-021)

1. Create a project at https://supabase.com, if one doesn't already exist.
2. Copy the project's URL and both keys into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
   The anon key is only used by the public, tokenized check-in flow
   (`src/app/checkin/[token]/*`), which authorizes off the invite token
   itself and never needed a Supabase session. Every coach-scoped dashboard
   query now goes through the service-role key instead, with an explicit
   `coach_id` filter at each call site (see `src/lib/supabase/data.ts`) --
   Supabase's Row Level Security can no longer authenticate these requests
   now that sessions come from Neon Auth, not Supabase Auth.
3. Run the SQL in `migrations/` against the project, in order (SQL Editor,
   or `supabase db push` if using the Supabase CLI locally).

## 3. Stripe setup

1. Create three recurring Prices in the Stripe Dashboard (Starter $29/mo,
   Pro $59/mo, Studio $99/mo) and set their IDs as `STRIPE_PRICE_STARTER`
   / `STRIPE_PRICE_PRO` / `STRIPE_PRICE_STUDIO`.
2. Set `STRIPE_SECRET_KEY` from Developers → API keys.
3. Add a webhook endpoint pointing at
   `<your-site-url>/api/webhooks/stripe`, subscribed to
   `checkout.session.completed`, `customer.subscription.updated`, and
   `customer.subscription.deleted`. Set its signing secret as
   `STRIPE_WEBHOOK_SECRET`.
