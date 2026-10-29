import type { IqElevonDataSource, IqElevonSnapshot } from "./types";

const disconnectedSource: IqElevonDataSource = {
  async getSnapshot(): Promise<IqElevonSnapshot> {
    return {
      mode: "disconnected",
      generatedAt: new Date().toISOString(),
      system: {
        items: [
          "Sistema",
          "Provider",
          "Mercado",
          "Notícias",
          "Legacy",
          "V2",
          "F5",
          "OOS",
          "Candle Finality",
          "Tradability",
          "Database",
        ].map((label) => ({
          id: label,
          label,
          state: "OFFLINE",
          detail: "Fonte de dados não conectada.",
          updatedAt: null,
        })),
        uptimeSeconds: null,
        updatedAt: null,
      },
      preAlerts: [],
      confirmedSignals: [],
      activeTrades: [],
      shadowOpportunities: [],
      history: [],
      engines: [],
      evidence: (["H1", "H2", "H3", "OOS", "F5"] as const).map((id) => ({
        id,
        state: null,
        detail: "Aguardando evidência da fonte de dados.",
        updatedAt: null,
      })),
    };
  },
};

/** Server-side selection only. Production can never opt into local fixtures. */
export async function getIqElevonDataSource(): Promise<IqElevonDataSource> {
  if (process.env.NODE_ENV === "development") {
    const { demoDataSource } = await import("./fixtures");
    return demoDataSource;
  }
  return disconnectedSource;
}
