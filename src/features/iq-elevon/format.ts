import type {
  IqWindowState,
  IqHistoryRecord,
  IqHistorySummary,
  IqEngine,
} from "./types";

export function secondsRemaining(target: string, now: number): number {
  const delta = Date.parse(target) - now;
  return Number.isFinite(delta) ? Math.max(0, Math.ceil(delta / 1000)) : 0;
}
/** Display thresholds only; does not define or change engine ENTRY_WINDOW. */
export function windowState(seconds: number): IqWindowState {
  return seconds <= 0 ? "EXPIRED" : seconds <= 7 ? "CLOSING" : "READY";
}
export function clockTime(value: string | null): string {
  return value
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date(value))
    : "—";
}
export function historyInPeriod(
  records: IqHistoryRecord[],
  days: number,
  now: number,
): IqHistoryRecord[] {
  // Calendar days at the portal's explicit São Paulo timezone (UTC−03).
  const shifted = new Date(now - 3 * 3600_000);
  const start =
    Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate() - days + 1,
    ) +
    3 * 3600_000;
  return records.filter(
    (r) => Date.parse(r.occurredAt) >= start && Date.parse(r.occurredAt) <= now,
  );
}
export function summarizeHistory(
  records: IqHistoryRecord[],
  engine: IqEngine,
): IqHistorySummary {
  const selected = records.filter((r) => r.engine === engine);
  return {
    engine,
    win: selected.filter((r) => r.outcome === "WIN").length,
    loss: selected.filter((r) => r.outcome === "LOSS").length,
    tie: selected.filter((r) => r.outcome === "TIE").length,
    pending: selected.filter((r) => r.outcome === "PENDING").length,
  };
}
