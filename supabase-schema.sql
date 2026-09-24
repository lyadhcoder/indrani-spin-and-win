create table if not exists public.gifts (
  id text primary key,
  code text not null,
  name text not null,
  weight numeric not null default 0,
  stock integer not null default 0,
  unlimited boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.spins (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  mobile text not null,
  gift_id text references public.gifts(id) on delete set null,
  gift_code text,
  created_at timestamptz not null default now()
);

create table if not exists public.spin_settings (
  id integer primary key,
  max_spins integer not null default 1
);

alter table public.gifts enable row level security;
alter table public.spins enable row level security;
alter table public.spin_settings enable row level security;

-- Shared demo/campaign policies. For a public production campaign, replace these
-- with authenticated admin policies and a server-side spin function.
create policy "public can read gifts" on public.gifts for select using (true);
create policy "public can insert gifts" on public.gifts for insert with check (true);
create policy "public can update gifts" on public.gifts for update using (true) with check (true);
create policy "public can delete gifts" on public.gifts for delete using (true);
create policy "public can read spins" on public.spins for select using (true);
create policy "public can insert spins" on public.spins for insert with check (true);
create policy "public can delete spins" on public.spins for delete using (true);
create policy "public can read settings" on public.spin_settings for select using (true);
create policy "public can insert settings" on public.spin_settings for insert with check (true);
create policy "public can update settings" on public.spin_settings for update using (true) with check (true);

insert into public.gifts (id,code,name,weight,stock,unlimited,active,sort_order)
values
('g1','G1','Gift 1',60,100,false,true,1),
('g2','G2','Gift 2',20,50,false,true,2),
('g3','G3','Gift 3',15,20,false,true,3),
('g4','G4','Gift 4',5,10,false,true,4),
('g5','G5','Gift 5',0,5,false,true,5)
on conflict (id) do nothing;
insert into public.spin_settings(id,max_spins) values (1,1) on conflict (id) do nothing;
