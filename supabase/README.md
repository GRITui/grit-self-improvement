# Supabase setup

1. Create a project at https://supabase.com.
2. Copy `.env.example` to `.env.local` and fill in the project's URL and anon
   key (Project Settings → API).
3. Run the SQL in `migrations/` against the project (SQL Editor, or
   `supabase db push` if using the Supabase CLI locally).
4. Enable the Google provider under Authentication → Providers, and add
   `<your-site-url>/auth/callback` as an authorized redirect URL (both in
   Supabase and in the Google Cloud OAuth client).
5. Under Authentication → URL Configuration, set the Site URL to match
   `NEXT_PUBLIC_SITE_URL`.
6. Copy the service role key (Project Settings → API) into
   `SUPABASE_SERVICE_ROLE_KEY` — used only by the Stripe webhook handler.

## Stripe setup

1. Create three recurring Prices in the Stripe Dashboard (Starter $29/mo,
   Pro $59/mo, Studio $99/mo) and set their IDs as `STRIPE_PRICE_STARTER`
   / `STRIPE_PRICE_PRO` / `STRIPE_PRICE_STUDIO`.
2. Set `STRIPE_SECRET_KEY` from Developers → API keys.
3. Add a webhook endpoint pointing at
   `<your-site-url>/api/webhooks/stripe`, subscribed to
   `checkout.session.completed`, `customer.subscription.updated`, and
   `customer.subscription.deleted`. Set its signing secret as
   `STRIPE_WEBHOOK_SECRET`.
