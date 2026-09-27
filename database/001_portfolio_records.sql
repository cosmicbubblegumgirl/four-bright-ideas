create table if not exists public.portfolio_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  app text not null check (app in ('billbento','trolleypop','lingoloom','rhythmnest')),
  collection text not null check (length(collection) between 1 and 50),
  id text not null check (length(id) between 1 and 100),
  data jsonb not null check (pg_column_size(data) <= 65536),
  updated_at timestamptz not null default now(),
  primary key (user_id, app, collection, id)
);

create index if not exists portfolio_records_updated_idx
  on public.portfolio_records (user_id, app, collection, updated_at desc);

alter table public.portfolio_records enable row level security;
revoke all on public.portfolio_records from anon;
grant select, insert, update, delete on public.portfolio_records to authenticated;

create policy "Read own portfolio records"
  on public.portfolio_records for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own portfolio records"
  on public.portfolio_records for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own portfolio records"
  on public.portfolio_records for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Delete own portfolio records"
  on public.portfolio_records for delete to authenticated
  using ((select auth.uid()) = user_id);
