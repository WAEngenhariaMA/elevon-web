import { ShieldCheck } from "lucide-react";
import type { IqConfirmedSignal } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { Countdown } from "./countdown";
import { Direction } from "./direction";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";
export function ConfirmedSignalCard({
  signal,
  now,
}: {
  signal: IqConfirmedSignal;
  now: string;
}) {
  return (
    <article
      className={`${s.card} ${s.signal}`}
      aria-label={`Sinal confirmado ${signal.asset}`}
    >
      <div className={s.cardTop}>
        <span className={s.eyebrow}>LEGACY / SINAL CONFIRMADO</span>
        <StatusPill label={`MERCADO ${signal.market}`} tone="positive" />
      </div>
      <div className={s.row}>
        <h3>{signal.asset}</h3>
        <div className={s.signalDirection}>
          <Direction value={signal.direction} />
        </div>
      </div>
      <dl className={s.fields}>
        <div>
          <dt>Entrada</dt>
          <dd>{clockTime(signal.entryAt)}</dd>
        </div>
        <div>
          <dt>Executar até</dt>
          <dd>{clockTime(signal.entryDeadline)}</dd>
        </div>
        <div>
          <dt>Expiração</dt>
          <dd>{clockTime(signal.expiryAt)}</dd>
        </div>
        <div>
          <dt>Payout</dt>
          <dd>{signal.payout}%</dd>
        </div>
      </dl>
      <Countdown
        target={signal.entryDeadline}
        initialNow={now}
        variant="window"
      />
      <div className={s.signalFooter}>
        <span>
          {signal.engine} · {signal.strategy}
        </span>
        <span className={s.row}>
          <ShieldCheck size={13} aria-hidden="true" /> Execução manual
        </span>
      </div>
    </article>
  );
}
