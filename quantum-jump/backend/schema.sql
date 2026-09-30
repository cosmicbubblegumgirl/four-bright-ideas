create table if not exists public.qj_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Learner' check (length(display_name) <= 80),
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table if not exists public.qj_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('note','bookmark','attempt','task','progress','chat','plan')),
  record_key text not null check (length(record_key) <= 120),
  data jsonb not null check (octet_length(data::text) < 100000),
  updated_at timestamptz not null default now(),
  primary key(user_id,kind,record_key)
);
create table if not exists public.qj_educators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.qj_resources (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (length(title) between 1 and 180),
  description text not null default '' check (length(description) <= 6000),
  paper integer not null check (paper in (1,2)),
  topic text not null default '',
  kind text not null check (kind in ('lesson','paper','memo','worksheet','video','link')),
  year integer check (year between 1990 and 2100),
  sitting text not null default '',
  language text not null default 'English',
  source_author text not null default 'Simoné Govender',
  original boolean not null default true,
  published boolean not null default false,
  file_path text,
  external_url text,
  paired_resource uuid references public.qj_resources(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists qj_resources_paper_topic on public.qj_resources(paper,topic,published);
create index if not exists qj_records_user_kind on public.qj_records(user_id,kind);
alter table public.qj_profiles enable row level security;
alter table public.qj_records enable row level security;
alter table public.qj_educators enable row level security;
alter table public.qj_resources enable row level security;
grant select,insert,update,delete on public.qj_profiles,public.qj_records to authenticated;
grant select on public.qj_educators to authenticated;
grant select,insert,update,delete on public.qj_resources to authenticated;
grant select on public.qj_resources to anon;
create policy qj_profile_owner on public.qj_profiles for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy qj_record_owner on public.qj_records for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy qj_educator_self on public.qj_educators for select to authenticated using ((select auth.uid())=user_id);
create policy qj_resource_read on public.qj_resources for select to anon,authenticated using (published or owner_id=(select auth.uid()));
create policy qj_resource_insert on public.qj_resources for insert to authenticated with check (owner_id=(select auth.uid()) and exists(select 1 from public.qj_educators where user_id=(select auth.uid())));
create policy qj_resource_update on public.qj_resources for update to authenticated using (owner_id=(select auth.uid()) and exists(select 1 from public.qj_educators where user_id=(select auth.uid()))) with check (owner_id=(select auth.uid()) and exists(select 1 from public.qj_educators where user_id=(select auth.uid())));
create policy qj_resource_delete on public.qj_resources for delete to authenticated using (owner_id=(select auth.uid()) and exists(select 1 from public.qj_educators where user_id=(select auth.uid())));

create schema if not exists qj_private;
revoke all on schema qj_private from public,anon,authenticated;
grant usage on schema qj_private to service_role;
create table qj_private.invites (token_hash text primary key, expires_at timestamptz not null, claimed_by uuid references auth.users(id), claimed_at timestamptz);
create table qj_private.settings (id integer primary key check(id=1), provider text not null, api_key text not null, model text not null);
create table qj_private.rate_limits (user_id uuid primary key references auth.users(id) on delete cascade, window_start timestamptz not null default now(), requests int not null default 1);
grant all on all tables in schema qj_private to service_role;

create function public.qj_claim_educator(p_token_hash text, p_user uuid) returns boolean language plpgsql security definer set search_path='' as $$
declare changed int;
begin
  update qj_private.invites set claimed_by=p_user,claimed_at=now() where token_hash=p_token_hash and claimed_by is null and expires_at>now();
  get diagnostics changed=row_count;
  if changed=0 then return false; end if;
  insert into public.qj_educators(user_id) values(p_user) on conflict do nothing;
  return true;
end; $$;
revoke all on function public.qj_claim_educator(text,uuid) from public,anon,authenticated;
grant execute on function public.qj_claim_educator(text,uuid) to service_role;

create function public.qj_ai_configuration(p_provider text default null,p_key text default null,p_model text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare cfg jsonb;
begin
  if p_key is not null then
    insert into qj_private.settings values(1,p_provider,p_key,p_model) on conflict(id) do update set provider=excluded.provider,api_key=excluded.api_key,model=excluded.model;
  end if;
  select to_jsonb(s) into cfg from qj_private.settings s where id=1;
  return cfg;
end; $$;
revoke all on function public.qj_ai_configuration(text,text,text) from public,anon,authenticated;
grant execute on function public.qj_ai_configuration(text,text,text) to service_role;

create function public.qj_check_rate(p_user uuid) returns boolean language plpgsql security definer set search_path='' as $$
declare n int;
begin
  insert into qj_private.rate_limits(user_id) values(p_user) on conflict(user_id) do update set requests=case when qj_private.rate_limits.window_start<now()-interval '1 hour' then 1 else qj_private.rate_limits.requests+1 end,window_start=case when qj_private.rate_limits.window_start<now()-interval '1 hour' then now() else qj_private.rate_limits.window_start end returning requests into n;
  return n<=30;
end; $$;
revoke all on function public.qj_check_rate(uuid) from public,anon,authenticated;
grant execute on function public.qj_check_rate(uuid) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('quantum-jump','quantum-jump',false,20971520,array['application/pdf','image/png','image/jpeg','image/webp','text/plain']) on conflict(id) do nothing;
create policy qj_file_insert on storage.objects for insert to authenticated with check(bucket_id='quantum-jump' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.qj_educators where user_id=(select auth.uid())));
create policy qj_file_read on storage.objects for select to authenticated using(bucket_id='quantum-jump' and (exists(select 1 from public.qj_resources r where r.file_path=name and (r.published or r.owner_id=(select auth.uid()))) or ((storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.qj_educators where user_id=(select auth.uid())))));
create policy qj_file_delete on storage.objects for delete to authenticated using(bucket_id='quantum-jump' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.qj_educators where user_id=(select auth.uid())));
