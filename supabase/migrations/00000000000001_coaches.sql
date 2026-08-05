-- Coach profile table, one row per authenticated coach (auth.users).
-- Created automatically on signup via trigger so downstream tables (clients,
-- programs, etc.) have a stable coach_id to foreign-key against.

create table if not exists public.coaches (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.coaches enable row level security;

create policy "Coaches can view their own row"
  on public.coaches for select
  using (auth.uid() = id);

create policy "Coaches can update their own row"
  on public.coaches for update
  using (auth.uid() = id);

-- Auto-create a coaches row whenever a new auth user signs up
-- (email/password or Google OAuth both go through auth.users).
create or replace function public.handle_new_coach()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.coaches (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_coach();
