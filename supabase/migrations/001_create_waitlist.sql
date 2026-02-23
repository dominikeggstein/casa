create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  source text default 'landing',
  referrer text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anonymous inserts (for waitlist signups)
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- Only service role can read (admin)
create policy "Service role can read waitlist"
  on public.waitlist
  for select
  to service_role
  using (true);
