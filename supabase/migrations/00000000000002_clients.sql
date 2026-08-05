-- Client roster, scoped to the owning coach via RLS. Each client gets a
-- unique invite_token used to build their tokenized, no-login check-in link
-- (the public check-in page itself is TSK-007).

create extension if not exists pgcrypto;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.coaches (id) on delete cascade,
  name text not null,
  email text,
  invite_token text not null default encode(gen_random_bytes(16), 'hex'),
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists clients_invite_token_key
  on public.clients (invite_token);

create index if not exists clients_coach_id_idx
  on public.clients (coach_id);

alter table public.clients enable row level security;

create policy "Coaches can view their own clients"
  on public.clients for select
  using (auth.uid() = coach_id);

create policy "Coaches can add their own clients"
  on public.clients for insert
  with check (auth.uid() = coach_id);

create policy "Coaches can update their own clients"
  on public.clients for update
  using (auth.uid() = coach_id);

create policy "Coaches can delete their own clients"
  on public.clients for delete
  using (auth.uid() = coach_id);
