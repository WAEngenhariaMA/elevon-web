# IQ_ELEVON_PORTAL_UI_SEMANTICS_V1 = READY

Correção restrita à semântica dos fixtures, contratos locais, copy e contadores. CSS, cores, tipografia, sidebar, grid, header e branding preservados.

| Pergunta | Resultado |
| --- | --- |
| A) Pré-alerta M1 respeita aproximadamente 12 s? | PASS. Gerado em `demoNow`, candle fecha em `demoNow + 12 s`. O contador mostra segundos e a copy inclui NÃO ENTRE AINDA. |
| B) Janela confirmada respeita 15 s? | PASS. `entryAt = demoNow − 6 s`; `entryDeadline = entryAt + 15 s`, com 9 s restantes no snapshot. |
| C) Countdown expira corretamente? | PASS. Usa deadline absoluto: >7 s READY, 4–7 s ATENÇÃO, 1–3 s URGENTE, zero JANELA ENCERRADA. Testado no navegador, inclusive permanecendo expirado após mais 60 s. |
| D) Latência V2 está em segundos? | PASS. Cards mostram 9.1 s e 9.7 s; Motores mostra 9.1 s. Contratos usam `decisionLatencySeconds` e `latencySeconds`. |
| E) Nenhum backend foi conectado? | PASS. Fixtures continuam exclusivamente locais em desenvolvimento. Produção permanece SEM INTEGRAÇÃO. Sem acesso a VPS, API operacional ou Supabase real. |

## Coerência temporal

`createDemoSnapshot(demoNow = Date.now())` centraliza todos os fixtures. Sinais confirmados, acompanhamento e oportunidades Shadow usam `entryAt` e `expiryAt` com exatamente cinco minutos de diferença. A geração da decisão V2 ocorre em `entryAt + decisionLatencySeconds`, antes do deadline de 15 s. O último ciclo V2 ocorre após as duas decisões do snapshot.

Os valores de 12 s, 15 s e cinco minutos descrevem somente os fixtures visuais; nenhuma configuração de motor ou estratégia foi alterada. Os contadores calculam a diferença entre o deadline recebido e o relógio atual; não decrementam uma duração fixa. O horário usado na apresentação nunca retrocede para antes do timestamp do snapshot recebido, evitando exibir valores maiores por um pequeno atraso do relógio local.

ELIGIBLE é explicitado como “teria sido operacionalmente executável em Shadow”, preservando o badge NÃO EXECUTA ORDENS e sem recomendação de trade.

## Verificação executada

- `node scripts/verify-iq-elevon.mjs --domain-only`: PASS. Testa o horário atual e viradas de dia/ano, lead M1, deadline de 15 s, expiração de cinco minutos, relação geração/latência V2 e distinção dos contratos de pré-alerta e confirmado.
- `node scripts/verify-iq-elevon.mjs`: PASS. Navegador Edge/Chromium, desktop 1440 px, mobile 375/390/430 px, cinco visões, copy, unidades, sidebar, histórico, foco e estados do countdown.
- `node scripts/verify-iq-elevon.mjs --production`: PASS. Proteção de acesso e ausência de fixtures nas cinco visões.
- `npm run lint`: PASS, sem erros. Permanecem três warnings anteriores em `src/components/projects/project-gallery.tsx`.
- `npm run typecheck`: PASS.
- `npm run build`: PASS.

A autenticação usada nos testes é um serviço HTTP simulado local, iniciado e encerrado pelo script. O middleware real da aplicação permanece ativo. Não foi usado login de uma conta real.

Evidências: [domínio](./domain-checks.json), [navegador](./ui-checks.json), [produção](./production-checks.json), [lint](./lint.log), [typecheck](./typecheck.log) e [build](./build.log).

## Capturas corrigidas

- [Desktop 1440 px](./desktop-1440.png)
- [Operação mobile 390 px](./mobile-390-operacao.png)
- [Janela encerrada mobile](./mobile-expired.png)
- [Motores mobile, latência em segundos](./mobile-390-motores.png)

Também foram capturadas as visões Histórico, Evidências e Sistema em 390 px, além de produção sem integração. As capturas desta fase estão nesta pasta; os arquivos de `artifacts/iq-elevon/` documentam a entrega visual anterior.

## Arquivos ajustados nesta fase

```text
src/features/iq-elevon/fixtures.ts
src/features/iq-elevon/types.ts
src/components/iq-elevon/countdown.tsx
src/components/iq-elevon/pre-alert-card.tsx
src/components/iq-elevon/confirmed-signal-card.tsx
src/components/iq-elevon/active-trade-card.tsx
src/components/iq-elevon/v2-shadow-card.tsx
src/components/iq-elevon/engines-view.tsx
scripts/verify-iq-elevon.mjs
artifacts/iq-elevon-semantics/*
```

Os contratos locais foram padronizados para `generatedAt`, `entryAt`, `entryDeadline`, `expiryAt` e unidades explícitas em segundos. A interface permanece desacoplada do backend futuro.
