-- The public check-in page must lead with the coach's name, not the
-- product's (design/wireframes/client-checkin.md "Content & UX notes").
-- coaches had no display-name field (TSK-005 auth only captured email), so
-- add one and best-effort backfill it from OAuth profile data on signup.

alter table public.coaches add column if not exists full_name text;

create or replace function public.handle_new_coach()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.coaches (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Widen get_client_by_invite_token to include the coach's display name,
-- falling back to a generic label if the coach never set one (e.g. signed
-- up via email/password, which doesn't collect a name).
drop function if exists public.get_client_by_invite_token(text);

create function public.get_client_by_invite_token(token text)
returns table (
  id uuid,
  name text,
  cadence text,
  questions jsonb,
  is_active boolean,
  coach_name text
)
language sql
security definer
set search_path = public
as $$
  select
    c.id,
    c.name,
    c.cadence,
    c.questions,
    c.archived_at is null as is_active,
    coalesce(nullif(co.full_name, ''), 'Your coach') as coach_name
  from public.clients c
  join public.coaches co on co.id = c.coach_id
  where c.invite_token = token
  limit 1;
$$;

grant execute on function public.get_client_by_invite_token(text)
  to anon, authenticated;
