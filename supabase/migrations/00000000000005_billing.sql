-- Stripe subscription billing + plan gating (TSK-009). `plan` only ever
-- moves to starter/pro/studio/canceled via the Stripe webhook handler
-- (source of truth is Stripe, not a value the app sets directly). Whether
-- a 'trialing' coach's trial has actually expired is a derived runtime
-- check against trial_ends_at (see src/lib/billing.ts), not a stored
-- state, so no scheduled job is needed to flip it.

alter table public.coaches
  add column if not exists plan text not null default 'trialing'
    check (plan in ('trialing', 'starter', 'pro', 'studio', 'canceled')),
  add column if not exists trial_ends_at timestamptz not null default (now() + interval '14 days'),
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text;

create unique index if not exists coaches_stripe_customer_id_key
  on public.coaches (stripe_customer_id)
  where stripe_customer_id is not null;
