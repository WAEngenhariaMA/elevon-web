# IQ ELEVON — Portal UI V1

Implementação local em `/admin/iq-elevon`, dentro do route group administrativo e da proteção Supabase existentes. Navegação interna com URLs compartilháveis: `?view=historico`, `?view=motores`, `?view=evidencias` e `?view=sistema`; Operação é a visão padrão.

## Validação

| Critério | Resultado | Evidência |
| --- | --- | --- |
| auth protection | PASS | Cinco visões redirecionam sessões ausentes/inválidas ao login, em desenvolvimento e produção. Acesso autenticado validado com serviço HTTP de autenticação local de teste. |
| mobile | PASS | 375, 390 e 430 px; cinco visões sem overflow horizontal da página; sidebar abre, navega e fecha. |
| desktop | PASS | Chromium/Edge headless, viewport de 1440 × 1100 e inspeção da captura completa. |
| design system | PASS | Componentes reutilizáveis, CSS Module isolado, navy/dourado Elevon, cores funcionais, foco visível e direção com texto e seta. |
| pre-alert semantics | PASS | PREPARE O ATIVO e AGUARDE CONFIRMAÇÃO; nenhuma indicação de execução ou confirmação. |
| confirmed-signal UX | PASS | Ativo, direção, horários, payout, motor, mercado OPEN e janela; READY → CLOSING → urgência ≤3s → EXPIRED, sem reabrir. |
| V2 Shadow separation | PASS | Seção e registros separados; badge NÃO EXECUTA ORDENS; eligible/blocked e respectivos motivos. |
| lint | PASS | `npm run lint`, exit 0. Três warnings já existentes em `src/components/projects/project-gallery.tsx`; nenhum erro. |
| typecheck | PASS | `npm run typecheck`, exit 0. Gera tipos do Next antes de executar `tsc --noEmit`. |
| build | PASS | `npm run build`, exit 0; rota dinâmica `/admin/iq-elevon` presente. Log em `build.log`. |

Logs estruturados: [desenvolvimento](./ui-checks.json) e [produção](./production-checks.json). O teste usa um serviço Supabase Auth HTTP simulado exclusivamente no processo de verificação; não modifica nem desativa o middleware e não acessa o Supabase real. Não foi usado login de uma conta real.

## Capturas

- [Desktop 1440 px](./desktop-1440.png)
- [Operação mobile 390 px](./mobile-390-operacao.png)
- [Histórico mobile 390 px](./mobile-390-historico.png)
- [Motores mobile 390 px](./mobile-390-motores.png)
- [Evidências mobile 390 px](./mobile-390-evidencias.png)
- [Sistema mobile 390 px](./mobile-390-sistema.png)
- [Janela encerrada](./mobile-expired.png)
- [Produção sem integração](./production-disconnected.png)

As capturas de desenvolvimento omitem somente o indicador flutuante do Next.js durante a captura. Nenhum componente da aplicação é ocultado.

## Arquivos alterados

- `src/components/admin/sidebar.tsx`: item IQ Elevon com ícone Activity e `aria-current` nos links administrativos.
- `src/app/admin/(dashboard)/layout.tsx`: `min-w-0` no conteúdo para permitir contenção responsiva dentro do flex.
- `package.json`: typecheck independente de um build anterior, usando `next typegen && tsc --noEmit`.
- `next.config.ts`: inicialização do contexto local Cloudflare restrita à fase de desenvolvimento; opção local `CLOUDFLARE_DEV_CONTEXT=off` para verificação sem workerd. Necessário porque o runtime local apresentou access violation neste Windows. Não altera a configuração de deploy ou os bindings de produção.

## Arquivos criados e estrutura

```text
src/app/admin/(dashboard)/iq-elevon/
  page.tsx                       rota autenticada, seleção de visão, metadata privada

src/features/iq-elevon/
  types.ts                       contratos TypeScript
  data-source.ts                 interface de leitura e seleção de fonte no servidor
  fixtures.ts                    dados visuais locais, somente em desenvolvimento
  format.ts                      horário de Brasília, janela visual e filtros de histórico

src/components/iq-elevon/
  iq-shell.tsx                   identidade, navegação e badge da fonte
  iq-elevon.module.css            tokens e estilos isolados e responsivos
  operation-view.tsx              composição da operação
  history-view.tsx                filtros Hoje / 7 dias / 30 dias, resumo por motor
  engines-view.tsx                telemetria somente leitura
  evidence-view.tsx               estrutura H1 / H2 / H3 / OOS / F5
  system-view.tsx                 saúde dos onze serviços
  system-status.tsx               status prioritários e detalhes expansíveis
  status-pill.tsx                 estados textuais com cor funcional
  pre-alert-card.tsx              preparação, sem ação operacional
  confirmed-signal-card.tsx       destaque operacional e janela
  active-trade-card.tsx           acompanhamento compacto
  v2-shadow-card.tsx              observação técnica separada
  direction.tsx                  CALL ↑ / PUT ↓
  countdown.tsx                  contador absoluto e atualização ao retornar à aba
  metric-card.tsx                 métricas reutilizáveis
  empty-state.tsx                 estados sem dados

scripts/
  verify-iq-elevon.mjs            verificação de domínio e navegador, dev e produção

artifacts/iq-elevon/
  ENTREGA.md                     documentação desta entrega
  build.log                      log do build
  ui-checks.json                 resultados e log do servidor de desenvolvimento
  production-checks.json         resultados e log do servidor de produção
  *.png                          oito capturas descritas acima
```

## Contratos e fonte de dados

`IqElevonDataSource.getSnapshot(): Promise<IqElevonSnapshot>` concentra o acesso aos dados. Não existe fetch operacional nos componentes. A futura integração deve implementar essa interface no servidor.

Contratos principais: `IqSystemStatus`, `IqHealthItem`, `IqPreAlert`, `IqConfirmedSignal`, `IqActiveTrade`, `IqV2ShadowOpportunity`, `IqHistoryRecord`, `IqHistorySummary`, `IqEngineStatus` e `IqEvidence`. Uniões tipadas: direção CALL/PUT, estados de saúde, janela READY/CLOSING/EXPIRED, resultados WIN/LOSS/TIE/PENDING e estados de evidência.

Somente `NODE_ENV=development` carrega o módulo de fixtures. O badge DEMO DATA acompanha todas as visões nesse ambiente. Produção e teste recebem uma fonte desconectada, sem ativos, operações ou resultados fabricados; métricas indisponíveis exibem traços. Nenhuma query string ou variável pública permite habilitar fixtures em produção.

Evidências começam SEM DADOS inclusive em desenvolvimento. A legenda de estados previstos é identificada como referência visual, sem representar resultados ou checkpoints reais.

## Decisões de UX

- Ordem mobile: status → pré-alertas → sinais confirmados → acompanhamento → V2 Shadow → resumo. Desktop aproveita uma segunda coluna para o contexto Shadow.
- Sinal confirmado em navy com direção e contador grandes; pré-alerta em fundo âmbar claro com linguagem de preparação.
- Os limites de 7 e 3 segundos afetam apenas a apresentação. Nenhuma regra real de ENTRY_WINDOW é implementada ou alterada.
- Contagem baseada no timestamp absoluto, sem subtrair ticks acumulados; sincronização local ao retomar uma aba em segundo plano. Relógio do provider e sincronização com servidor pertencem à integração futura.
- Histórico filtrado por dias de calendário de São Paulo, separando sempre Legacy de V2; sem comparação automática de WR.
- Tabelas operacionais substituídas por cards e pares de rótulo/valor. Tabs internas roláveis têm área de toque de 48 px; filtros têm 44 px.
- Sem botões de execução, compra, direção ou controle de motor. A interface é somente leitura.

## Reproduzir a verificação local

Os testes usam Playwright disponível no ambiente, sem adicionar biblioteca à aplicação. Configure `IQ_PLAYWRIGHT_PATH` com o módulo Playwright instalado; opcionalmente configure `IQ_BROWSER_CHANNEL=msedge` ou `chrome` para usar o navegador local. Sem channel, é necessário ter o Chromium do Playwright instalado.

```powershell
npm ci
npm run lint
npm run typecheck
npm run build

# Após apontar IQ_PLAYWRIGHT_PATH para o módulo Playwright disponível:
$env:IQ_BROWSER_CHANNEL = 'msedge'
node scripts/verify-iq-elevon.mjs
node scripts/verify-iq-elevon.mjs --production
```

Os testes reservam temporariamente as portas locais 3101/4411 (dev) e 3102/4412 (produção), criam uma sessão fictícia e encerram os processos ao concluir. Nenhum segredo real é utilizado ou salvo.

Nenhuma alteração em páginas públicas, conteúdo, SEO público, Supabase, banco, VPS, estratégias, motor ou outro repositório. Nenhuma dependência de aplicação adicionada.
