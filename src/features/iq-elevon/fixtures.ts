import type {
  IqElevonDataSource,
  IqHealthState,
  IqHistoryRecord,
  IqElevonSnapshot,
} from "./types";

/** Local visual fixtures, never a trading feed. All timestamps share demoNow. */
export function createDemoSnapshot(
  demoNow: number = Date.now(),
): IqElevonSnapshot {
  const at = (seconds: number) =>
    new Date(demoNow + seconds * 1000).toISOString();
  // Fixture semantics only: no engine configuration or trading rule is changed.
  const confirmedEntry = -6;
  const activeEntry = -90;
  const shadowEntry = -11;
  const entryWindowSeconds = 15;
  const expirySeconds = 5 * 60;
  const preAlertLeadSeconds = 12;
  const statuses: [string, IqHealthState, string][] = [
    ["Sistema", "ONLINE", "Serviços disponíveis no cenário visual."],
    ["Provider", "ONLINE", "Conexão simulada • feed de candles."],
    ["Mercado", "ONLINE", "OPEN • pares disponíveis no cenário visual."],
    ["Notícias", "ONLINE", "Monitor de notícias simulado."],
    ["Legacy", "ONLINE", "Operacional • execução manual."],
    ["V2", "SHADOW", "Observação técnica • não executa ordens."],
    ["F5", "COLETANDO", "Estado ilustrativo • sem evidências carregadas."],
    ["OOS", "WARMING", "Estado ilustrativo • sem evidências carregadas."],
    ["Candle Finality", "ONLINE", "Finalidade simulada dos candles."],
    ["Tradability", "ONLINE", "Disponibilidade simulada dos ativos."],
    ["Database", "ONLINE", "Estado ilustrativo • nenhuma conexão real."],
  ];
  const history: IqHistoryRecord[] = [
    {
      id: "h1",
      engine: "Legacy",
      asset: "EUR/USD",
      direction: "PUT",
      outcome: "WIN",
      occurredAt: at(-600),
    },
    {
      id: "h2",
      engine: "Legacy",
      asset: "USD/JPY",
      direction: "PUT",
      outcome: "PENDING",
      occurredAt: at(activeEntry),
    },
    {
      id: "h3",
      engine: "Legacy",
      asset: "AUD/USD",
      direction: "CALL",
      outcome: "LOSS",
      occurredAt: at(-86400 * 3),
    },
    {
      id: "h4",
      engine: "Legacy",
      asset: "EUR/USD",
      direction: "PUT",
      outcome: "TIE",
      occurredAt: at(-86400 * 12),
    },
    {
      id: "h5",
      engine: "V2 Operational Shadow",
      asset: "EUR/GBP",
      direction: "PUT",
      outcome: "PENDING",
      occurredAt: at(shadowEntry + 9.1),
    },
    {
      id: "h6",
      engine: "V2 Operational Shadow",
      asset: "EUR/GBP",
      direction: "CALL",
      outcome: "WIN",
      occurredAt: at(-86400 * 4),
    },
  ];
  return {
    mode: "demo",
    generatedAt: at(0),
    system: {
      items: statuses.map(([label, state, detail]) => ({
        id: label,
        label,
        state,
        detail,
        updatedAt: at(-2),
      })),
      uptimeSeconds: 27_428,
      updatedAt: at(-2),
    },
    preAlerts: [
      {
        id: "pre-1",
        asset: "EUR/USD",
        possibleDirection: "PUT",
        strategy: "Legacy • M1 / expiração 5m",
        payout: 87,
        candleClosesAt: at(preAlertLeadSeconds),
        secondsToClose: preAlertLeadSeconds,
        generatedAt: at(0),
      },
    ],
    confirmedSignals: [
      {
        id: "confirmed-1",
        asset: "GBP/JPY",
        direction: "CALL",
        generatedAt: at(confirmedEntry + 1),
        entryAt: at(confirmedEntry),
        entryDeadline: at(confirmedEntry + entryWindowSeconds),
        expiryAt: at(confirmedEntry + expirySeconds),
        payout: 87,
        strategy: "M1 / expiração 5m",
        engine: "Legacy",
        market: "OPEN",
      },
    ],
    activeTrades: [
      {
        id: "active-1",
        asset: "USD/JPY",
        direction: "PUT",
        generatedAt: at(activeEntry),
        entryAt: at(activeEntry),
        expiryAt: at(activeEntry + expirySeconds),
      },
    ],
    shadowOpportunities: [
      {
        id: "shadow-1",
        asset: "EUR/GBP",
        direction: "PUT",
        playbook: "Pullback de continuação",
        generatedAt: at(shadowEntry + 9.1),
        entryAt: at(shadowEntry),
        entryDeadline: at(shadowEntry + entryWindowSeconds),
        decisionLatencySeconds: 9.1,
        payout: 85,
        eligibility: "eligible",
        reason:
          "Critérios técnicos atendidos dentro da janela de 15 s no cenário local.",
        expiryAt: at(shadowEntry + expirySeconds),
      },
      {
        id: "shadow-2",
        asset: "AUD/USD",
        direction: "CALL",
        playbook: "Reversão de estrutura",
        generatedAt: at(shadowEntry + 9.7),
        entryAt: at(shadowEntry),
        entryDeadline: at(shadowEntry + entryWindowSeconds),
        decisionLatencySeconds: 9.7,
        payout: 72,
        eligibility: "blocked",
        reason: "Payout abaixo do limite do cenário local.",
        expiryAt: at(shadowEntry + expirySeconds),
      },
    ],
    history,
    engines: [
      {
        engine: "Legacy",
        status: "ONLINE",
        mode: "MANUAL",
        lastCycle: at(-2),
        operableSignals: 1,
        latencySeconds: null,
        technicalMatches: null,
        eligibleOpportunities: null,
      },
      {
        engine: "V2 Operational Shadow",
        status: "SHADOW",
        mode: "SHADOW",
        lastCycle: at(-1),
        operableSignals: null,
        latencySeconds: 9.1,
        technicalMatches: 2,
        eligibleOpportunities: 1,
      },
    ],
    // Evidence is intentionally empty: do not fabricate research/checkpoint results.
    evidence: (["H1", "H2", "H3", "OOS", "F5"] as const).map((id) => ({
      id,
      state: null,
      detail: "Nenhuma evidência carregada. Aguardando fonte de dados.",
      updatedAt: null,
    })),
  };
}

/** Loaded only by the development data-source selector. */
export const demoDataSource: IqElevonDataSource = {
  async getSnapshot() {
    return createDemoSnapshot();
  },
};
