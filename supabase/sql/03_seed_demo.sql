-- OPCIONAL: execute somente em ambiente de demonstracao.
-- Todos os registros abaixo sao ficticios e nao devem ser usados como dados reais.

insert into public.contatos (nome, telefone, fonte, oficial, ativo)
values
  ('Central Sol (DEMO)', '(00) 0000-0001', 'Fonte de demonstracao', true, true),
  ('Apoio da Praca Sol (DEMO)', '(00) 0000-0002', 'Fonte de demonstracao', true, true);

insert into public.avisos (titulo, texto, data_publicacao, fonte, verificado, ativo)
values
  ('Mutirao de limpeza da praca (DEMO)', 'Aviso ficticio de demonstracao.', current_date, 'Fonte de demonstracao', true, true),
  ('Aviso nao verificado (DEMO)', 'Este texto nao deve aparecer ao publico.', current_date, 'Fonte de demonstracao', false, true);
