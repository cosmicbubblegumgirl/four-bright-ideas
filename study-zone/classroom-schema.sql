create schema if not exists study_zone_private;
revoke all on schema study_zone_private from public, anon;
grant usage on schema study_zone_private to authenticated;

create table public.sz_roles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check(role in ('admin','tutor')),
 created_at timestamptz not null default now()
);
alter table public.sz_roles enable row level security;
revoke all on public.sz_roles from anon, authenticated;
grant select,insert,update,delete on public.sz_roles to authenticated;

create function study_zone_private.current_role() returns text
language sql stable security definer set search_path=''
as $$ select r.role from public.sz_roles r where r.user_id=(select auth.uid()) $$;
revoke all on function study_zone_private.current_role() from public,anon;
grant execute on function study_zone_private.current_role() to authenticated;
create policy sz_roles_read on public.sz_roles for select to authenticated
 using(user_id=(select auth.uid()) or (select study_zone_private.current_role())='admin');
create policy sz_roles_insert on public.sz_roles for insert to authenticated
 with check((select study_zone_private.current_role())='admin' and role='tutor');
create policy sz_roles_update on public.sz_roles for update to authenticated
 using((select study_zone_private.current_role())='admin' and role='tutor')
 with check((select study_zone_private.current_role())='admin' and role='tutor');
create policy sz_roles_delete on public.sz_roles for delete to authenticated
 using((select study_zone_private.current_role())='admin' and role='tutor');

create table public.sz_study_state (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null check(jsonb_typeof(data)='object' and pg_column_size(data)<=2097152),
 updated_at timestamptz not null default now()
);
alter table public.sz_study_state enable row level security;
revoke all on public.sz_study_state from anon,authenticated;
grant select,insert,update,delete on public.sz_study_state to authenticated;
create policy sz_state_select on public.sz_study_state for select to authenticated using(user_id=(select auth.uid()));
create policy sz_state_insert on public.sz_study_state for insert to authenticated with check(user_id=(select auth.uid()));
create policy sz_state_update on public.sz_study_state for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy sz_state_delete on public.sz_study_state for delete to authenticated using(user_id=(select auth.uid()));

create table public.sz_sessions (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id),
 title text not null check(length(title) between 1 and 140),
 subject text not null check(length(subject) between 1 and 80),
 description text not null default '' check(length(description)<=2000),
 tutor_name text not null check(length(tutor_name) between 1 and 80),
 starts_at timestamptz not null,
 ends_at timestamptz not null check(ends_at>starts_at and ends_at<=starts_at+interval '8 hours'),
 meeting_url text not null default '' check(meeting_url='' or meeting_url ~ '^https://[^[:space:]]+$'),
 published boolean not null default false,
 created_at timestamptz not null default now()
);
create index sz_sessions_schedule_idx on public.sz_sessions(published,starts_at);
create index sz_sessions_owner_idx on public.sz_sessions(owner_id);
alter table public.sz_sessions enable row level security;
revoke all on public.sz_sessions from anon,authenticated;
grant select on public.sz_sessions to anon;
grant select,insert,update,delete on public.sz_sessions to authenticated;
create policy sz_sessions_public on public.sz_sessions for select to anon using(published);
create policy sz_sessions_read on public.sz_sessions for select to authenticated using(published or owner_id=(select auth.uid()) or (select study_zone_private.current_role())='admin');
create policy sz_sessions_insert on public.sz_sessions for insert to authenticated with check(owner_id=(select auth.uid()) and (select study_zone_private.current_role()) in ('admin','tutor'));
create policy sz_sessions_update on public.sz_sessions for update to authenticated
 using((owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor') or (select study_zone_private.current_role())='admin')
 with check((owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor') or (select study_zone_private.current_role())='admin');
create policy sz_sessions_delete on public.sz_sessions for delete to authenticated using((owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor') or (select study_zone_private.current_role())='admin');

create table public.sz_resources (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id),
 title text not null check(length(title) between 1 and 140),
 subject text not null check(length(subject) between 1 and 80),
 kind text not null check(kind in ('Notes','Video','Worksheet','Presentation','Classroom','Other')),
 description text not null default '' check(length(description)<=2000),
 url text not null default '' check(url='' or url ~ '^https://[^[:space:]]+$'),
 file_path text not null default '',
 published boolean not null default false,
 created_at timestamptz not null default now(),
 check(url<>'' or file_path<>'')
);
create index sz_resources_library_idx on public.sz_resources(published,subject,created_at desc);
create index sz_resources_owner_idx on public.sz_resources(owner_id);
create index sz_resources_file_idx on public.sz_resources(file_path) where file_path<>'';
alter table public.sz_resources enable row level security;
revoke all on public.sz_resources from anon,authenticated;
grant select on public.sz_resources to anon;
grant select,insert,update,delete on public.sz_resources to authenticated;
create policy sz_resources_public on public.sz_resources for select to anon using(published);
create policy sz_resources_read on public.sz_resources for select to authenticated using(published or owner_id=(select auth.uid()) or (select study_zone_private.current_role())='admin');
create policy sz_resources_insert on public.sz_resources for insert to authenticated with check(owner_id=(select auth.uid()) and (select study_zone_private.current_role()) in ('admin','tutor') and (not published or (select study_zone_private.current_role())='admin') and (file_path='' or split_part(file_path,'/',1)=(select auth.uid())::text));
create policy sz_resources_update on public.sz_resources for update to authenticated using((owner_id=(select auth.uid()) and not published and (select study_zone_private.current_role())='tutor') or (select study_zone_private.current_role())='admin') with check((owner_id=(select auth.uid()) and not published and (select study_zone_private.current_role())='tutor' and (file_path='' or split_part(file_path,'/',1)=(select auth.uid())::text)) or (select study_zone_private.current_role())='admin');
create policy sz_resources_delete on public.sz_resources for delete to authenticated using((owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor') or (select study_zone_private.current_role())='admin');

create table public.sz_rsvps (
 session_id uuid not null references public.sz_sessions(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 display_name text not null check(length(display_name) between 1 and 80),
 status text not null default 'going' check(status in ('going','cancelled')),
 share_progress boolean not null default false,
 created_at timestamptz not null default now(), primary key(session_id,user_id)
);
create index sz_rsvps_user_idx on public.sz_rsvps(user_id,session_id);
alter table public.sz_rsvps enable row level security;
revoke all on public.sz_rsvps from anon,authenticated;
grant select,insert,delete on public.sz_rsvps to authenticated;
grant update(display_name,status,share_progress) on public.sz_rsvps to authenticated;
create policy sz_rsvps_read on public.sz_rsvps for select to authenticated using(user_id=(select auth.uid()) or (select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_sessions s where s.id=session_id and s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor'));
create policy sz_rsvps_insert on public.sz_rsvps for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.sz_sessions s where s.id=session_id and s.published));
create policy sz_rsvps_update on public.sz_rsvps for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy sz_rsvps_delete on public.sz_rsvps for delete to authenticated using(user_id=(select auth.uid()));

create table public.sz_attendance (
 session_id uuid not null, user_id uuid not null,
 status text not null check(status in ('present','absent','excused')),
 recorded_by uuid not null references auth.users(id),
 updated_at timestamptz not null default now(),
 primary key(session_id,user_id), foreign key(session_id,user_id) references public.sz_rsvps(session_id,user_id) on delete cascade
);
create index sz_attendance_user_idx on public.sz_attendance(user_id,session_id);
alter table public.sz_attendance enable row level security;
revoke all on public.sz_attendance from anon,authenticated;
grant select,insert,update on public.sz_attendance to authenticated;
create policy sz_attendance_read on public.sz_attendance for select to authenticated using(user_id=(select auth.uid()) or (select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_sessions s where s.id=session_id and s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor'));
create policy sz_attendance_insert on public.sz_attendance for insert to authenticated with check(recorded_by=(select auth.uid()) and ((select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_sessions s where s.id=session_id and s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor')));
create policy sz_attendance_update on public.sz_attendance for update to authenticated using((select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_sessions s where s.id=session_id and s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor')) with check(recorded_by=(select auth.uid()) and ((select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_sessions s where s.id=session_id and s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor')));

create table public.sz_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 subject text not null check(length(subject) between 1 and 80),
 topics_completed integer not null check(topics_completed between 0 and 1000),
 attempts integer not null check(attempts between 0 and 100000),
 correct integer not null check(correct between 0 and attempts),
 updated_at timestamptz not null default now(), primary key(user_id,subject)
);
alter table public.sz_progress enable row level security;
revoke all on public.sz_progress from anon,authenticated;
grant select,insert,update,delete on public.sz_progress to authenticated;
create policy sz_progress_read on public.sz_progress for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.sz_rsvps r join public.sz_sessions s on s.id=r.session_id where r.user_id=sz_progress.user_id and r.status='going' and r.share_progress and s.subject=sz_progress.subject and ((select study_zone_private.current_role())='admin' or (s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor'))));
create policy sz_progress_insert on public.sz_progress for insert to authenticated with check(user_id=(select auth.uid()));
create policy sz_progress_update on public.sz_progress for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy sz_progress_delete on public.sz_progress for delete to authenticated using(user_id=(select auth.uid()));

create table public.sz_feedback (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 session_id uuid references public.sz_sessions(id) on delete set null,
 subject text not null check(length(subject) between 1 and 80),
 rating integer not null check(rating between 1 and 5),
 message text not null check(length(message) between 1 and 2000),
 needs_help boolean not null default false,created_at timestamptz not null default now()
);
create index sz_feedback_session_idx on public.sz_feedback(session_id,created_at desc);
create index sz_feedback_user_idx on public.sz_feedback(user_id);
alter table public.sz_feedback enable row level security;
revoke all on public.sz_feedback from anon,authenticated;
grant select,insert on public.sz_feedback to authenticated;
create policy sz_feedback_read on public.sz_feedback for select to authenticated using(user_id=(select auth.uid()) or (select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_sessions s where s.id=session_id and s.owner_id=(select auth.uid()) and (select study_zone_private.current_role())='tutor'));
create policy sz_feedback_insert on public.sz_feedback for insert to authenticated with check(user_id=(select auth.uid()) and (session_id is null or exists(select 1 from public.sz_sessions s where s.id=session_id and s.published)));

create table public.sz_tutor_requests (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null check(length(display_name) between 1 and 80),
 subjects text[] not null check(array_length(subjects,1) between 1 and 63),
 availability text not null check(length(availability) between 1 and 1000),
 created_at timestamptz not null default now()
);
alter table public.sz_tutor_requests enable row level security;
revoke all on public.sz_tutor_requests from anon,authenticated;
grant select,insert,update on public.sz_tutor_requests to authenticated;
create policy sz_tutor_requests_read on public.sz_tutor_requests for select to authenticated using(user_id=(select auth.uid()) or (select study_zone_private.current_role())='admin');
create policy sz_tutor_requests_insert on public.sz_tutor_requests for insert to authenticated with check(user_id=(select auth.uid()));
create policy sz_tutor_requests_update on public.sz_tutor_requests for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('study-zone-resources','study-zone-resources',false,20971520,array['application/pdf','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','image/jpeg','text/plain']);
create policy sz_files_insert on storage.objects for insert to authenticated with check(bucket_id='study-zone-resources' and (storage.foldername(name))[1]=(select auth.uid())::text and (select study_zone_private.current_role()) in ('admin','tutor'));
create policy sz_files_read_anon on storage.objects for select to anon using(bucket_id='study-zone-resources' and exists(select 1 from public.sz_resources r where r.file_path=name and r.published));
create policy sz_files_read on storage.objects for select to authenticated using(bucket_id='study-zone-resources' and ((storage.foldername(name))[1]=(select auth.uid())::text or (select study_zone_private.current_role())='admin' or exists(select 1 from public.sz_resources r where r.file_path=name and r.published)));
create policy sz_files_delete on storage.objects for delete to authenticated using(bucket_id='study-zone-resources' and ((storage.foldername(name))[1]=(select auth.uid())::text or (select study_zone_private.current_role())='admin'));
