# Mapa do sistema Elevon

Este documento aponta onde fica cada parte importante do sistema.

## Site público

| Área | Arquivo principal | Responsabilidade |
| --- | --- | --- |
| Página inicial | `src/app/page.tsx` | Hero, soluções, CTA e seção de contato. |
| Cabeçalho | `src/components/layout/header.tsx` | Navegação principal e menu responsivo. |
| Rodapé | `src/components/layout/footer.tsx` | Marca, links institucionais e direitos autorais. |
| Ecossistema | `src/components/sections/ecosystem.tsx` | Seção que apresenta as verticais Elevon. |
| Verticais | `src/app/[vertical]/page.tsx` | Páginas Digital, Engenharia, AI, Academy e Labs. |
| Produtos | `src/app/produtos/page.tsx` | Catálogo público de produtos. |
| Cartão de produto | `src/components/cards/product-card.tsx` | Componente visual reutilizável do catálogo. |
| Link Hub | `src/app/links/page.tsx` | Página de links para bio e redes sociais. |

## Marca, imagens e estilos

| Área | Arquivo principal | Responsabilidade |
| --- | --- | --- |
| Logo original | `public/elevon-logo.png` | Arquivo de logo utilizado no rodapé. |
| Identidade das verticais | `src/config/brand.ts` | Nomes, cores, descrições e mensagens de WhatsApp. |
| Estilos globais | `src/app/globals.css` | Base visual global e Tailwind. |
| Metadados globais | `src/app/layout.tsx` | Título, descrição e Open Graph do site. |
| SEO técnico | `src/app/sitemap.ts` e `src/app/robots.ts` | Sitemap e regras para buscadores. |

## Painel administrativo

| Área | Arquivo principal | Responsabilidade |
| --- | --- | --- |
| Login administrativo | `src/app/admin/login/page.tsx` | Tela de entrada do painel. |
| Dashboard | `src/app/admin/(dashboard)/page.tsx` | Página inicial da administração. |
| Layout protegido | `src/app/admin/(dashboard)/layout.tsx` | Estrutura das páginas autenticadas. |
| Menu administrativo | `src/components/admin/sidebar.tsx` | Navegação, logout e menu móvel. |
| Produtos | `src/app/admin/(dashboard)/produtos/` | Lista, criação, edição e formulário de produtos. |
| Projetos | `src/app/admin/(dashboard)/projetos/` | Lista, criação, edição e formulário de projetos. |
| Banners | `src/app/admin/(dashboard)/banners/` | Lista, criação, edição e formulário de banners. |
| Links | `src/app/admin/(dashboard)/links/` | Gestão do Link Hub. |
| Categorias | `src/app/admin/(dashboard)/categorias/` | Organização de links e produtos. |
| Redes sociais | `src/app/admin/(dashboard)/redes-sociais/` | Perfis sociais públicos. |
| Configurações | `src/app/admin/(dashboard)/configuracoes/` | Configurações editáveis do site. |

## Dados, autenticação e integrações

| Área | Arquivo principal | Responsabilidade |
| --- | --- | --- |
| Supabase no servidor | `src/services/supabase/server.ts` | Cliente seguro para Server Components e Server Actions. |
| Mutações de banco | `src/services/supabase/mutations.ts` | Operações compartilhadas de escrita. |
| Upload de arquivos | `src/services/supabase/storage.ts` | Comunicação com Supabase Storage. |
| Autenticação | `src/features/auth/actions.ts` | Logout e ações da sessão. |
| Proteção do admin | `src/proxy.ts` | Redireciona visitantes sem sessão fora do painel. |
| Login por rota | `src/app/auth/login/route.ts` | Route Handler usado pelo formulário de login. |
| Estrutura dos dados | `src/types/index.ts` | Interfaces TypeScript de produtos, links, projetos e demais entidades. |
| Banco e permissões | `supabase/migrations/` | Tabelas, RLS, buckets e dados iniciais. |

## Regras de negócio por domínio

Cada domínio tem arquivos `queries.ts` para leitura e `actions.ts` para criação, edição e exclusão.

| Domínio | Pasta |
| --- | --- |
| Produtos | `src/features/products/` |
| Projetos | `src/features/projects/` |
| Banners | `src/features/banners/` |
| Categorias | `src/features/categories/` |
| Links | `src/features/links/` |
| Redes sociais | `src/features/social/` |
| Configurações | `src/features/settings/` |

## Conversão, contato e analytics

| Área | Arquivo principal | Responsabilidade |
| --- | --- | --- |
| WhatsApp | `src/lib/whatsapp.ts` | Gera links `wa.me` e mensagens por origem. |
| Botão de WhatsApp | `src/components/ui/whatsapp-link.tsx` | Link de contato com rastreamento. |
| Links rastreados | `src/components/ui/tracked-link.tsx` | Eventos em links de navegação e conversão. |
| Scripts de analytics | `src/components/analytics/analytics-scripts.tsx` | Google Analytics e Meta Pixel. |
| Eventos de analytics | `src/components/analytics/events.ts` | Função `trackEvent(...)`. |
| UTM | `src/components/analytics/utm-capture.tsx` e `src/lib/utm.ts` | Captura e persistência de parâmetros de campanha. |

## Configuração e publicação

| Área | Arquivo principal | Responsabilidade |
| --- | --- | --- |
| Variáveis locais | `.env.example` e `.dev.vars.example` | Modelos de configuração sem segredos. |
| Next.js | `next.config.ts` | Configuração do framework. |
| Cloudflare | `wrangler.jsonc` e `open-next.config.ts` | Build e deploy na Cloudflare. |
| Dependências e comandos | `package.json` | Scripts de desenvolvimento, validação e deploy. |
