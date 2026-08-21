alter table public.projects
add column if not exists subtitle text,
add column if not exists challenge text,
add column if not exists solution text,
add column if not exists development text,
add column if not exists architecture_description text,
add column if not exists architecture_image_url text,
add column if not exists capabilities text[] not null default '{}'::text[],
add column if not exists benefits text[] not null default '{}'::text[],
add column if not exists technologies text[] not null default '{}'::text[],
add column if not exists cta_title text,
add column if not exists cta_text text,
add column if not exists cta_label text,
add column if not exists cta_message text;

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  caption text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_media_project_id_sort_order_idx
on public.project_media(project_id, sort_order);

drop trigger if exists project_media_updated on public.project_media;

create trigger project_media_updated
before update on public.project_media
for each row
execute function public.set_updated_at();

alter table public.project_media enable row level security;

drop policy if exists "public reads active project media"
on public.project_media;

create policy "public reads active project media"
on public.project_media
for select
using (
  active
  and exists (
    select 1
    from public.projects p
    where p.id = project_media.project_id
      and p.active = true
      and p.status in ('em_andamento', 'concluido')
  )
);

drop policy if exists "authenticated manage project media"
on public.project_media;

create policy "authenticated manage project media"
on public.project_media
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public reads active projects"
on public.projects;

create policy "public reads active projects"
on public.projects
for select
using (
  active = true
  and status in ('em_andamento', 'concluido')
);
