import type { IqElevonSnapshot } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { StatusPill } from "./status-pill";
import { MetricCard } from "./metric-card";
import s from "./iq-elevon.module.css";
export function SystemView({ data }: { data: IqElevonSnapshot }) {
  const uptime = data.system.uptimeSeconds;
  return (
    <>
      <div className={s.sectionHeading}>
        <div>
          <h2 className={s.title}>System Health</h2>
          <p className={s.description}>
            Saúde dos serviços e atualidade dos dados. Somente leitura.
          </p>
        </div>
        <StatusPill label="MONITORAMENTO" />
      </div>
      <div className={s.metrics}>
        <MetricCard
          label="UPTIME"
          value={
            uptime === null
              ? null
              : `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`
          }
        />
        <MetricCard
          label="ÚLTIMA ATUALIZAÇÃO"
          value={clockTime(data.system.updatedAt)}
        />
      </div>
      <div className={s.health}>
        {data.system.items.map((item) => (
          <article className={s.card} key={item.id}>
            <div className={s.row}>
              <h3>{item.label}</h3>
              <StatusPill label={item.state} />
            </div>
            {item.label === "V2" && (
              <p>
                <StatusPill
                  label="SHADOW • NÃO EXECUTA ORDENS"
                  tone="shadowTone"
                />
              </p>
            )}
            <p>{item.detail}</p>
            <small>Atualizado às {clockTime(item.updatedAt)}</small>
          </article>
        ))}
      </div>
      <section className={`${s.card} mt-6`}>
        <span className={s.eyebrow}>LEGENDA DE ESTADOS</span>
        <div className={`${s.row} mt-4`}>
          {[
            "ONLINE",
            "OFFLINE",
            "RECUPERANDO",
            "SHADOW",
            "COLETANDO",
            "WARMING",
            "STALE",
          ].map((state) => (
            <StatusPill key={state} label={state} />
          ))}
        </div>
      </section>
    </>
  );
}
