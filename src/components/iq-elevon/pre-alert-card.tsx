import type { IqPreAlert } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { Countdown } from "./countdown";
import { Direction } from "./direction";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";
export function PreAlertCard({
  alert,
  now,
}: {
  alert: IqPreAlert;
  now: string;
}) {
  return (
    <article
      className={`${s.card} ${s.preAlert}`}
      aria-label={`Pré-alerta ${alert.asset}`}
    >
      <div className={s.cardTop}>
        <StatusPill label="PRÉ-ALERTA" tone="attention" />
        <Countdown
          target={alert.candleClosesAt}
          initialNow={now}
          variant="seconds"
          endedLabel="AGUARDE ATUALIZAÇÃO"
        />
      </div>
      <div className={s.row}>
        <h3>{alert.asset}</h3>
        <span className={s.eyebrow}>
          POSSÍVEL <Direction value={alert.possibleDirection} />
        </span>
      </div>
      <div className={s.prepare}>PREPARE O ATIVO</div>
      <p>AGUARDE CONFIRMAÇÃO. NÃO ENTRE AINDA. O pré-alerta não é um sinal.</p>
      <dl className={s.fields}>
        <div>
          <dt>Estratégia</dt>
          <dd>{alert.strategy}</dd>
        </div>
        <div>
          <dt>Payout</dt>
          <dd>{alert.payout}%</dd>
        </div>
        <div>
          <dt>Fechamento do candle</dt>
          <dd>{clockTime(alert.candleClosesAt)}</dd>
        </div>
        <div>
          <dt>Gerado às</dt>
          <dd>{clockTime(alert.generatedAt)}</dd>
        </div>
      </dl>
    </article>
  );
}
