-- Sri School of Art: initial database schema and access policies.
-- Run this file once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create type public.content_status as enum ('draft', 'published', 'archived');
create type public.registration_status as enum (
  'new',
  'contacted',
  'trial_booked',
  'enrolled',
  'closed'
);
create type public.enquiry_status as enum ('new', 'in_progress', 'resolved', 'closed');

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'School administrator',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null default '',
  age_group text not null,
  skill_level text not null default 'All levels',
  duration text not null default '',
  schedule_summary text not null default '',
  materials text not null default '',
  fee numeric(10, 2),
  fee_label text not null default '',
  mode text not null default 'offline',
  available_seats integer check (available_seats is null or available_seats >= 0),
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.class_batches (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  label text not null,
  day_label text not null default '',
  start_time time,
  end_time time,
  mode text not null default 'offline',
  capacity integer check (capacity is null or capacity >= 0),
  available_seats integer check (available_seats is null or available_seats >= 0),
  is_full boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workshops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  event_date date,
  start_time time,
  end_time time,
  age_group text not null default 'All ages',
  fee numeric(10, 2),
  available_seats integer check (available_seats is null or available_seats >= 0),
  image_url text,
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text not null,
  image_public_id text,
  alt_text text not null,
  caption text not null default '',
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  display_name text not null,
  learner_type text not null default '',
  photo_url text,
  consent_verified boolean not null default false,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null default '',
  link_label text,
  link_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique default (
    'SSA-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))
  ),
  student_name text not null,
  age integer check (age is null or age between 3 and 100),
  guardian_name text,
  phone text not null,
  email text,
  selected_class_id uuid references public.classes(id) on delete set null,
  selected_class_name text not null default '',
  preferred_batch text not null default '',
  learning_mode text not null default 'offline',
  previous_experience text not null default '',
  message text not null default '',
  status public.registration_status not null default 'new',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text not null default '',
  message text not null,
  source text not null default 'website',
  status public.enquiry_status not null default 'new',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  setting_key text primary key,
  setting_value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
      and active = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create trigger admin_users_set_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();
create trigger classes_set_updated_at
before update on public.classes
for each row execute function public.set_updated_at();
create trigger class_batches_set_updated_at
before update on public.class_batches
for each row execute function public.set_updated_at();
create trigger workshops_set_updated_at
before update on public.workshops
for each row execute function public.set_updated_at();
create trigger gallery_items_set_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();
create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();
create trigger announcements_set_updated_at
before update on public.announcements
for each row execute function public.set_updated_at();
create trigger registrations_set_updated_at
before update on public.registrations
for each row execute function public.set_updated_at();
create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_updated_at();
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.classes enable row level security;
alter table public.class_batches enable row level security;
alter table public.workshops enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.announcements enable row level security;
alter table public.registrations enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;

create policy "Admins can read their membership"
on public.admin_users for select
to authenticated
using ((select auth.uid()) = user_id and active = true);

create policy "Published classes are public"
on public.classes for select
to anon, authenticated
using (status = 'published' or (select public.is_admin()));
create policy "Admins manage classes"
on public.classes for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Active published batches are public"
on public.class_batches for select
to anon, authenticated
using (
  active = true
  and exists (
    select 1 from public.classes
    where classes.id = class_batches.class_id
      and classes.status = 'published'
  )
  or (select public.is_admin())
);
create policy "Admins manage class batches"
on public.class_batches for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Published workshops are public"
on public.workshops for select
to anon, authenticated
using (status = 'published' or (select public.is_admin()));
create policy "Admins manage workshops"
on public.workshops for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Published gallery items are public"
on public.gallery_items for select
to anon, authenticated
using (status = 'published' or (select public.is_admin()));
create policy "Admins manage gallery items"
on public.gallery_items for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Published consented testimonials are public"
on public.testimonials for select
to anon, authenticated
using (
  (status = 'published' and consent_verified = true)
  or (select public.is_admin())
);
create policy "Admins manage testimonials"
on public.testimonials for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Current published announcements are public"
on public.announcements for select
to anon, authenticated
using (
  (
    status = 'published'
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now())
  )
  or (select public.is_admin())
);
create policy "Admins manage announcements"
on public.announcements for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Visitors can submit registrations"
on public.registrations for insert
to anon, authenticated
with check (status = 'new' and admin_notes = '');
create policy "Admins manage registrations"
on public.registrations for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Visitors can submit enquiries"
on public.enquiries for insert
to anon, authenticated
with check (status = 'new' and admin_notes = '');
create policy "Admins manage enquiries"
on public.enquiries for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Public site settings are readable"
on public.site_settings for select
to anon, authenticated
using (is_public = true or (select public.is_admin()));
create policy "Admins manage site settings"
on public.site_settings for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

grant usage on schema public to anon, authenticated;
grant select on public.classes to anon, authenticated;
grant select on public.class_batches to anon, authenticated;
grant select on public.workshops to anon, authenticated;
grant select on public.gallery_items to anon, authenticated;
grant select on public.testimonials to anon, authenticated;
grant select on public.announcements to anon, authenticated;
grant select on public.site_settings to anon, authenticated;
grant insert on public.registrations to anon, authenticated;
grant insert on public.enquiries to anon, authenticated;
grant select, insert, update, delete on public.admin_users to authenticated;
grant select, insert, update, delete on public.classes to authenticated;
grant select, insert, update, delete on public.class_batches to authenticated;
grant select, insert, update, delete on public.workshops to authenticated;
grant select, insert, update, delete on public.gallery_items to authenticated;
grant select, insert, update, delete on public.testimonials to authenticated;
grant select, insert, update, delete on public.announcements to authenticated;
grant select, insert, update, delete on public.registrations to authenticated;
grant select, insert, update, delete on public.enquiries to authenticated;
grant select, insert, update, delete on public.site_settings to authenticated;

create index classes_status_sort_idx on public.classes(status, sort_order);
create index class_batches_class_id_idx on public.class_batches(class_id);
create index workshops_status_date_idx on public.workshops(status, event_date);
create index gallery_status_sort_idx on public.gallery_items(status, sort_order);
create index registrations_status_created_idx on public.registrations(status, created_at desc);
create index enquiries_status_created_idx on public.enquiries(status, created_at desc);
