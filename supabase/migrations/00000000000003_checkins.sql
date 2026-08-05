-- Public check-in flow (TSK-007). Clients answer a coach's questions via a
-- tokenized link with no login. All writes/reads for anonymous visitors go
-- through SECURITY DEFINER functions rather than broadening RLS on
-- `clients`/`checkins`, so an anonymous caller can only ever act on the one
-- client whose exact (128-bit random) invite_token they hold.

alter table public.clients
  add column if not exists cadence text not null default 'weekly',
  add column if not exists questions jsonb not null default
    '["How did this week go?", "What went well?", "What is one thing you are working on?"]'::jsonb;

alter table public.clients
  add constraint clients_questions_max_5
    check (jsonb_array_length(questions) <= 5);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists checkins_client_id_idx
  on public.checkins (client_id);

alter table public.checkins enable row level security;

create policy "Coaches can view checkins for their own clients"
  on public.checkins for select
  using (
    exists (
      select 1 from public.clients c
      where c.id = checkins.client_id and c.coach_id = auth.uid()
    )
  );

-- No insert/update/delete policies for anon/authenticated roles: all writes
-- go through submit_checkin() below, so RLS default-denies direct writes.

create or replace function public.get_client_by_invite_token(token text)
returns table (
  id uuid,
  name text,
  cadence text,
  questions jsonb,
  is_active boolean
)
language sql
security definer
set search_path = public
as $$
  select id, name, cadence, questions, archived_at is null as is_active
  from public.clients
  where invite_token = token
  limit 1;
$$;

grant execute on function public.get_client_by_invite_token(text)
  to anon, authenticated;

create or replace function public.submit_checkin(token text, answers jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_client_id uuid;
  v_checkin_id uuid;
begin
  select id into v_client_id
  from public.clients
  where invite_token = token and archived_at is null;

  if v_client_id is null then
    raise exception 'invalid_token';
  end if;

  insert into public.checkins (client_id, answers)
  values (v_client_id, answers)
  returning id into v_checkin_id;

  return v_checkin_id;
end;
$$;

grant execute on function public.submit_checkin(text, jsonb)
  to anon, authenticated;
