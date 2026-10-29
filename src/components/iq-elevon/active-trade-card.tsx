import type { IqActiveTrade } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { Countdown } from "./countdown";
import { Direction } from "./direction";
import s from "./iq-elevon.module.css";
export function ActiveTradeCard({
  trade,
  now,
}: {
  trade: IqActiveTrade;
  now: string;
}) {
  return (
    <article className={`${s.card} ${s.active}`}>
      <div>
        <span className={s.eyebrow}>LEGACY</span>
        <h3>{trade.asset}</h3>
        <Direction value={trade.direction} />
      </div>
      <div className={s.activeTimes}>
        <div>
          <span>Entrada</span>
          {clockTime(trade.entryAt)}
        </div>
        <div>
          <span>Expiração</span>
          {clockTime(trade.expiryAt)}
        </div>
        <div>
          <span>Tempo restante</span>
          <Countdown
            target={trade.expiryAt}
            initialNow={now}
            endedLabel="AGUARDA RESULTADO"
          />
        </div>
      </div>
    </article>
  );
}
