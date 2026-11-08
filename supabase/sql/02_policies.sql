revoke all on public.contatos from anon, authenticated;
revoke all on public.avisos from anon, authenticated;
revoke all on public.responsaveis from anon, authenticated;

grant select on public.contatos to anon, authenticated;
grant select on public.avisos to anon, authenticated;

drop policy if exists "publico_le_contatos_oficiais_ativos" on public.contatos;
create policy "publico_le_contatos_oficiais_ativos"
on public.contatos for select
to anon, authenticated
using (oficial = true and ativo = true);

drop policy if exists "publico_le_avisos_verificados_ativos" on public.avisos;
create policy "publico_le_avisos_verificados_ativos"
on public.avisos for select
to anon, authenticated
using (verificado = true and ativo = true);

create or replace function public.usuario_e_responsavel()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.responsaveis r
    where r.user_id = auth.uid()
  );
$$;

grant insert, update, delete on public.contatos to authenticated;
grant insert, update, delete on public.avisos to authenticated;

drop policy if exists "responsavel_le_todos_contatos" on public.contatos;
create policy "responsavel_le_todos_contatos"
on public.contatos for select to authenticated
using (public.usuario_e_responsavel());

drop policy if exists "responsavel_le_todos_avisos" on public.avisos;
create policy "responsavel_le_todos_avisos"
on public.avisos for select to authenticated
using (public.usuario_e_responsavel());

drop policy if exists "responsavel_insere_contatos" on public.contatos;
create policy "responsavel_insere_contatos"
on public.contatos for insert to authenticated
with check (public.usuario_e_responsavel());

drop policy if exists "responsavel_atualiza_contatos" on public.contatos;
create policy "responsavel_atualiza_contatos"
on public.contatos for update to authenticated
using (public.usuario_e_responsavel())
with check (public.usuario_e_responsavel());

drop policy if exists "responsavel_exclui_contatos" on public.contatos;
create policy "responsavel_exclui_contatos"
on public.contatos for delete to authenticated
using (public.usuario_e_responsavel());

drop policy if exists "responsavel_insere_avisos" on public.avisos;
create policy "responsavel_insere_avisos"
on public.avisos for insert to authenticated
with check (public.usuario_e_responsavel());

drop policy if exists "responsavel_atualiza_avisos" on public.avisos;
create policy "responsavel_atualiza_avisos"
on public.avisos for update to authenticated
using (public.usuario_e_responsavel())
with check (public.usuario_e_responsavel());

drop policy if exists "responsavel_exclui_avisos" on public.avisos;
create policy "responsavel_exclui_avisos"
on public.avisos for delete to authenticated
using (public.usuario_e_responsavel());

revoke all on function public.usuario_e_responsavel() from public, anon;
grant execute on function public.usuario_e_responsavel() to authenticated;
