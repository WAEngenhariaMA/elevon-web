import type { IqV2ShadowOpportunity } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { Direction } from "./direction";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";
export function V2ShadowCard({
  opportunity: o,
}: {
  opportunity: IqV2ShadowOpportunity;
}) {
  return (
    <article
      className={`${s.card} ${s.shadowCard}`}
      aria-label={`V2 Shadow ${o.asset}`}
    >
      <div className={s.cardTop}>
        <StatusPill label="SHADOW • NÃO EXECUTA ORDENS" tone="shadowTone" />
      </div>
      <div className={s.row}>
        <h3>{o.asset}</h3>
        <Direction value={o.direction} />
      </div>
      <dl className={s.fields}>
        <div>
          <dt>Playbook</dt>
          <dd>{o.playbook}</dd>
        </div>
        <div>
          <dt>Decision latency</dt>
          <dd>{o.decisionLatencySeconds.toFixed(1)} s</dd>
        </div>
        <div>
          <dt>Payout</dt>
          <dd>{o.payout}%</dd>
        </div>
        <div>
          <dt>Expiração</dt>
          <dd>{clockTime(o.expiryAt)}</dd>
        </div>
      </dl>
      <p>
        <StatusPill
          label={o.eligibility.toUpperCase()}
          tone={o.eligibility === "eligible" ? "shadowTone" : "neutral"}
        />
      </p>
      {o.eligibility === "eligible" && (
        <p>
          ELIGIBLE: teria sido operacionalmente executável em Shadow. Não é
          recomendação de trade.
        </p>
      )}
      <p>{o.reason}</p>
    </article>
  );
}
