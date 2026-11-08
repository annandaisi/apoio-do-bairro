create table if not exists public.contatos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  fonte text not null,
  oficial boolean not null default true,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint contatos_nome_valido check (char_length(btrim(nome)) between 3 and 120),
  constraint contatos_telefone_valido check (char_length(btrim(telefone)) between 8 and 30),
  constraint contatos_fonte_valida check (char_length(btrim(fonte)) between 3 and 180)
);

create table if not exists public.avisos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  texto text not null,
  data_publicacao date not null,
  fonte text not null,
  verificado boolean not null default false,
  ativo boolean not null default true,
  contato_id uuid references public.contatos(id) on delete set null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint avisos_titulo_valido check (char_length(btrim(titulo)) between 3 and 160),
  constraint avisos_texto_valido check (char_length(btrim(texto)) between 3 and 5000),
  constraint avisos_fonte_valida check (char_length(btrim(fonte)) between 3 and 180)
);

create table if not exists public.responsaveis (
  user_id uuid primary key references auth.users(id) on delete cascade,
  criado_em timestamptz not null default now()
);

create or replace function public.atualizar_timestamp()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists contatos_atualizado_em on public.contatos;
create trigger contatos_atualizado_em before update on public.contatos
for each row execute function public.atualizar_timestamp();

drop trigger if exists avisos_atualizado_em on public.avisos;
create trigger avisos_atualizado_em before update on public.avisos
for each row execute function public.atualizar_timestamp();

alter table public.contatos enable row level security;
alter table public.avisos enable row level security;
alter table public.responsaveis enable row level security;
