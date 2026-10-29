/** Future read-only IQ Elevon contract. Timestamps are ISO 8601 UTC. */
export type IqDirection = "CALL" | "PUT";
export type IqHealthState =
  | "ONLINE"
  | "OFFLINE"
  | "RECUPERANDO"
  | "SHADOW"
  | "COLETANDO"
  | "WARMING"
  | "STALE";
export type IqWindowState = "READY" | "CLOSING" | "EXPIRED";
export type IqEngine = "Legacy" | "V2 Operational Shadow";
export type IqView =
  "operacao" | "historico" | "motores" | "evidencias" | "sistema";
export interface IqHealthItem {
  id: string;
  label: string;
  state: IqHealthState;
  detail: string;
  updatedAt: string | null;
}
export interface IqSystemStatus {
  items: IqHealthItem[];
  uptimeSeconds: number | null;
  updatedAt: string | null;
}
export interface IqPreAlert {
  id: string;
  asset: string;
  possibleDirection: IqDirection;
  strategy: string;
  payout: number;
  candleClosesAt: string;
  secondsToClose: number;
  generatedAt: string;
}
export interface IqConfirmedSignal {
  id: string;
  asset: string;
  direction: IqDirection;
  generatedAt: string;
  entryAt: string;
  entryDeadline: string;
  expiryAt: string;
  payout: number;
  strategy: string;
  engine: "Legacy";
  market: "OPEN";
}
export interface IqActiveTrade {
  id: string;
  asset: string;
  direction: IqDirection;
  generatedAt: string;
  entryAt: string;
  expiryAt: string;
}
export interface IqV2ShadowOpportunity {
  id: string;
  asset: string;
  direction: IqDirection;
  playbook: string;
  generatedAt: string;
  entryAt: string;
  entryDeadline: string;
  decisionLatencySeconds: number;
  payout: number;
  eligibility: "eligible" | "blocked";
  reason: string;
  expiryAt: string;
}
export type IqOutcome = "WIN" | "LOSS" | "TIE" | "PENDING";
export interface IqHistoryRecord {
  id: string;
  engine: IqEngine;
  asset: string;
  direction: IqDirection;
  outcome: IqOutcome;
  occurredAt: string;
}
export interface IqHistorySummary {
  engine: IqEngine;
  win: number;
  loss: number;
  tie: number;
  pending: number;
}
export interface IqEngineStatus {
  engine: IqEngine;
  status: IqHealthState;
  mode: "MANUAL" | "SHADOW";
  lastCycle: string | null;
  operableSignals: number | null;
  latencySeconds: number | null;
  technicalMatches: number | null;
  eligibleOpportunities: number | null;
}
export type IqEvidenceState =
  | "COLLECTING"
  | "INTERIM"
  | "CONTINUE_OBSERVATION"
  | "WARMING"
  | "CHECKPOINT_REACHED";
export interface IqEvidence {
  id: "H1" | "H2" | "H3" | "OOS" | "F5";
  state: IqEvidenceState | null;
  detail: string;
  updatedAt: string | null;
}
export interface IqElevonSnapshot {
  mode: "demo" | "disconnected";
  generatedAt: string;
  system: IqSystemStatus;
  preAlerts: IqPreAlert[];
  confirmedSignals: IqConfirmedSignal[];
  activeTrades: IqActiveTrade[];
  shadowOpportunities: IqV2ShadowOpportunity[];
  history: IqHistoryRecord[];
  engines: IqEngineStatus[];
  evidence: IqEvidence[];
}
export interface IqElevonDataSource {
  getSnapshot(): Promise<IqElevonSnapshot>;
}
