# Elevon

Plataforma web oficial da Elevon — a marca-mãe que conecta cinco verticais
(Digital, Engenharia, AI, Academy e Labs) sob o posicionamento **Evolução •
Tecnologia • Resultados**.

Este repositório contém, em um único projeto Next.js, três produtos que
compartilham layout, design system, banco de dados, componentes e
autenticação:

1. **Site institucional** (`/`, `/digital`, `/engenharia`, `/ai`, `/academy`,
   `/labs`, `/produtos`) — apresentação da marca, do ecossistema e do
   catálogo de produtos.
2. **Link Hub** (`/links`) — página estilo Linktree para a bio do Instagram,
   consumindo links, categorias, produtos e redes sociais do Supabase.
3. **Painel administrativo** (`/admin`) — CRUD completo, protegido por
   autenticação, para editar todo o conteúdo público sem tocar em código.

Não é uma landing page: é a base tecnológica pensada para evoluir para
produtos, SaaS, automações e soluções de IA da Elevon.

## Arquitetura

- **App Router (Next.js)** com Server Components por padrão; Client
  Components apenas onde há interatividade (formulários, menus, sidebar).
- **Server Actions** para todas as mutações do admin (criar/editar/excluir),
  sem API routes intermediárias — exceto o login, que usa uma Route Handler
  (`/auth/login`) para poder ser chamada via `fetch` do client.
- **Row Level Security** no Postgres: leitura pública restrita a registros
  `active = true`; escrita restrita a usuários autenticados.
- **features/** organiza a lógica por domínio (`queries.ts` para leitura,
  `actions.ts` para mutação), independente da camada de apresentação em
  `app/`.

```
src/
  app/                     rotas (App Router)
    page.tsx               home
    [vertical]/             /digital, /engenharia, /ai, /academy, /labs
    produtos/               catálogo público
    links/                  link hub (bio do Instagram)
    admin/
      login/                 login (fora do layout autenticado)
      (dashboard)/           route group com sidebar, protegido pelo middleware
        links/ produtos/ categorias/ projetos/ banners/ redes-sociais/ configuracoes/
    auth/login/              route handler de autenticação
    sitemap.ts robots.ts     SEO técnico

  components/
    layout/                 header, footer
    sections/               seções da home (ecossistema)
    cards/                  cartões reutilizáveis (produto)
    admin/                  primitivas do painel (campos, tabela, sidebar, feedback)
    analytics/               scripts GA4/Meta Pixel, captura de UTM, trackEvent
    ui/                     componentes de interface compartilhados (links rastreados)

  features/                 lógica de domínio (queries + server actions)
    categories/ links/ products/ projects/ banners/ social/ settings/ auth/

  services/
    supabase/               clientes Supabase (server) e upload de Storage

  lib/                      utilitários (formatação, WhatsApp, UTM, ícones)
  types/                    interfaces TypeScript de todas as entidades
  config/                   configuração de marca (verticais, mensagens)
  proxy.ts                  protege /admin/** exigindo sessão Supabase (Next 16: middleware → proxy)

supabase/
  migrations/               schema, RLS, buckets e dados de demonstração
```

## Tecnologias

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Supabase (Postgres, Auth, Storage) via `@supabase/ssr`
- lucide-react para ícones

Sem dependências além do necessário — nada de bibliotecas de UI pesadas,
gerenciadores de estado externos ou ORMs adicionais.

## Design system

- Dourado `#D4AF37` · Prata `#C0C0C0` · Azul-escuro `#0B1320` · Azul elétrico
  `#2563EB` · Branco `#FFFFFF`
- Fonte: **Sora** (via `next/font/google`, aplicada globalmente em
  `globals.css`)

## Instalação

```bash
npm install
copy .env.example .env.local
```

Preencha `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_publica
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Chave pública (anon). Nunca use a `service_role` no frontend. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número em formato internacional (DDI+DDD+número), sem símbolos. |
| `NEXT_PUBLIC_GA_ID` | Não | ID do Google Analytics 4 (`G-XXXXXXX`). Se vazio, o script não é injetado. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Não | ID do Meta Pixel. Se vazio, o script não é injetado. |

As rotas públicas têm fallback demonstrativo quando as variáveis do
Supabase não estão preenchidas (ex.: `/produtos` exibe produtos de exemplo).

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute em ordem os arquivos de `supabase/migrations/`:
   - `20260818000000_initial_schema.sql` — tabelas, triggers, RLS e buckets.
   - `20260818010000_seed_demo_content.sql` — links, produtos, banners e
     redes sociais de demonstração (títulos marcados com "(Demo)";
     substitua ou remova pelo painel antes de publicar).
3. Em **Authentication → Users**, crie o usuário administrador (e-mail e
   senha) que terá acesso ao `/admin`.
4. Em **Project Settings → API**, copie a `URL` e a chave `anon public`
   para `.env.local`.
5. Em **Storage**, confirme que os buckets `products`, `projects`,
   `banners` e `site` foram criados como públicos (a migration já faz isso).

### Modelo de dados

`categories`, `links`, `products`, `projects`, `banners`, `social_links` e
`site_settings` — ver `src/types/index.ts` para os campos de cada entidade
e `supabase/migrations/20260818000000_initial_schema.sql` para o schema
completo.

### Segurança (RLS)

- Qualquer visitante pode **ler** apenas registros com `active = true`
  (e todos os `site_settings`, que não têm dado sensível).
- Apenas usuários **autenticados** podem **criar, editar e excluir**.
- Os buckets de Storage seguem a mesma regra: leitura pública, escrita
  autenticada.

## Autenticação

- Supabase Auth com e-mail e senha.
- `src/proxy.ts` protege todas as rotas `/admin/**` (exceto
  `/admin/login`), redirecionando visitantes não autenticados para o login.
  No Next.js 16 o arquivo de middleware foi renomeado para `proxy.ts`
  (função exportada `proxy` em vez de `middleware`); em projetos com pasta
  `src/`, ele deve ficar dentro de `src/`, não na raiz do repositório —
  caso contrário não é detectado.
- O logout é uma Server Action (`src/features/auth/actions.ts`) acionada
  pelo botão "Sair" na sidebar do admin.

## Rodando localmente

```bash
npm run dev
```

Acesse `http://localhost:3000` para o site público e
`http://localhost:3000/admin/login` para o painel.

## Qualidade

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy (Vercel + Supabase)

1. Importe o repositório na [Vercel](https://vercel.com).
2. Configure as mesmas variáveis de ambiente de `.env.local` no projeto
   Vercel (Production e Preview).
3. Faça o deploy — o build usa `next build` (Server Components e Server
   Actions funcionam nativamente na Vercel).
4. Para o domínio `elevon.digital.br`: em **Vercel → Settings → Domains**,
   adicione o domínio e siga as instruções de DNS (CNAME/A record)
   fornecidas pela Vercel junto ao seu provedor de DNS.
5. No Supabase, adicione a URL final de produção em **Authentication →
   URL Configuration** (Site URL e Redirect URLs) para que o login
   funcione corretamente em produção.

## Analytics

`src/components/analytics/analytics-scripts.tsx` injeta GA4 e Meta Pixel
apenas quando as variáveis de ambiente correspondentes estão definidas.
`src/components/analytics/events.ts` expõe `trackEvent(...)`, que envia o
evento para `gtag`, `fbq` e um `CustomEvent` interno, sempre enriquecido
com os parâmetros de UTM capturados na primeira visita
(`src/lib/utm.ts`). Eventos já instrumentados: `click_whatsapp`,
`click_product` / `view_product`, `click_checkout`, `click_link`.

## WhatsApp

`src/lib/whatsapp.ts` gera URLs `wa.me` com mensagens específicas por
vertical (configuradas em `src/config/brand.ts`) e por produto.
