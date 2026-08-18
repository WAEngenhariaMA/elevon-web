-- Dados de demonstração: claramente marcados com "(Demo)" no título/nome
-- e nas descrições. Substitua ou remova pelo conteúdo real através do
-- painel administrativo (/admin) antes de divulgar o site publicamente.

insert into public.links (title, subtitle, url, icon, category_id, sort_order, active, featured)
values
  ('Conheça o ecossistema Elevon (Demo)', 'Tecnologia, engenharia, IA e produtos', 'https://elevon.digital.br', 'Globe2', null, 1, true, true),
  ('Soluções Elevon AI (Demo)', 'Automação e inteligência aplicada', 'https://elevon.digital.br/ai', 'BrainCircuit', (select id from public.categories where slug = 'ai'), 2, true, true),
  ('Elevon Engenharia (Demo)', 'Planejamento, dados e automação', 'https://elevon.digital.br/engenharia', 'Cog', (select id from public.categories where slug = 'engenharia'), 3, true, false),
  ('Elevon Academy (Demo)', 'Cursos e treinamentos', 'https://elevon.digital.br/academy', 'GraduationCap', (select id from public.categories where slug = 'academy'), 4, true, false),
  ('Elevon Labs (Demo)', 'Softwares e inovação', 'https://elevon.digital.br/labs', 'FlaskConical', (select id from public.categories where slug = 'labs'), 5, true, false);

insert into public.products (name, slug, short_description, description, price, old_price, category_id, featured, active)
values
  ('Diagnóstico Digital (Demo)', 'diagnostico-digital-demo', 'Mapeamento de oportunidades para evolução digital.', 'Conteúdo de demonstração — substitua pelo produto real através do painel administrativo.', 990, 1290, (select id from public.categories where slug = 'digital'), true, true),
  ('Blueprint de Automação (Demo)', 'blueprint-automacao-demo', 'Uma base prática para automatizar operações com IA.', 'Conteúdo de demonstração — substitua pelo produto real através do painel administrativo.', 1490, null, (select id from public.categories where slug = 'ai'), true, true),
  ('Auditoria de Engenharia de Dados (Demo)', 'auditoria-engenharia-demo', 'Diagnóstico técnico de processos e dados de engenharia.', 'Conteúdo de demonstração — substitua pelo produto real através do painel administrativo.', 1290, null, (select id from public.categories where slug = 'engenharia'), false, true),
  ('Trilha Academy: Fundamentos de IA (Demo)', 'trilha-academy-ia-demo', 'Formação introdutória em Inteligência Artificial aplicada.', 'Conteúdo de demonstração — substitua pelo produto real através do painel administrativo.', 490, 690, (select id from public.categories where slug = 'academy'), false, true),
  ('Sprint Labs de Prototipagem (Demo)', 'sprint-labs-demo', 'Prototipagem rápida de software em ciclo curto.', 'Conteúdo de demonstração — substitua pelo produto real através do painel administrativo.', 1990, null, (select id from public.categories where slug = 'labs'), false, true);

insert into public.banners (title, subtitle, cta_text, cta_url, active)
values
  ('Evolução começa agora (Demo)', 'Conheça as soluções Elevon', 'Ver soluções', '/#solucoes', true),
  ('Novos produtos digitais (Demo)', 'Confira o catálogo Elevon', 'Ver produtos', '/produtos', true);

insert into public.social_links (platform, url, active)
values
  ('instagram', 'https://instagram.com/elevon.digital', true),
  ('linkedin', 'https://linkedin.com/company/elevon-digital', true),
  ('youtube', 'https://youtube.com/@elevon.digital', true),
  ('tiktok', 'https://tiktok.com/@elevon.digital', true);

insert into public.site_settings (key, value)
values
  ('whatsapp_padrao', '"5500000000000"'::jsonb),
  ('instagram_handle', '"@elevon.digital"'::jsonb)
on conflict (key) do nothing;
