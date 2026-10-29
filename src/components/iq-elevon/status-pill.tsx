import type {
  IqHealthState,
  IqEvidenceState,
} from "@/features/iq-elevon/types";
import s from "./iq-elevon.module.css";

export type IqTone =
  "positive" | "negative" | "attention" | "shadowTone" | "neutral";
const stateTone: Record<IqHealthState, IqTone> = {
  ONLINE: "positive",
  OFFLINE: "negative",
  RECUPERANDO: "attention",
  SHADOW: "shadowTone",
  COLETANDO: "neutral",
  WARMING: "attention",
  STALE: "attention",
};
export function StatusPill({
  label,
  tone,
}: {
  label: IqHealthState | IqEvidenceState | string;
  tone?: IqTone;
}) {
  const resolved = tone ?? stateTone[label as IqHealthState] ?? "neutral";
  return (
    <span className={`${s.pill} ${s[resolved]}`}>
      <span className={s.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
