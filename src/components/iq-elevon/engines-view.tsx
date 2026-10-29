import type { IqElevonSnapshot } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { StatusPill } from "./status-pill";
import { EmptyState } from "./empty-state";
import { MetricCard } from "./metric-card";
import s from "./iq-elevon.module.css";
export function EnginesView({ data }: { data: IqElevonSnapshot }) {
  return (
    <>
      <h2 className={s.title}>Motores</h2>
      <p className={s.description}>
        Legacy operacional. V2 em observação Shadow. Monitoramento somente
        leitura.
      </p>
      <div className={`${s.stack} mt-6`}>
        {data.engines.length ? (
          data.engines.map((engine) => (
            <section className={s.card} key={engine.engine}>
              <div className={s.cardTop}>
                <h3>{engine.engine}</h3>
                <StatusPill label={engine.status} />
              </div>
              <p className={s.description}>
                {engine.mode === "MANUAL"
                  ? "Operacional • execução manual pelo operador."
                  : "SHADOW • NÃO EXECUTA ORDENS. Observação técnica em paralelo."}
              </p>
              <dl className={s.fields}>
                <div>
                  <dt>Último ciclo</dt>
                  <dd>{clockTime(engine.lastCycle)}</dd>
                </div>
                <div>
                  <dt>Modo</dt>
                  <dd>{engine.mode}</dd>
                </div>
              </dl>
              <div className={s.metrics}>
                {engine.mode === "MANUAL" ? (
                  <MetricCard
                    label="SINAIS OPERÁVEIS"
                    value={engine.operableSignals}
                  />
                ) : (
                  <>
                    <MetricCard
                      label="LATÊNCIA"
                      value={
                        engine.latencySeconds === null
                          ? null
                          : `${engine.latencySeconds.toFixed(1)} s`
                      }
                    />
                    <MetricCard
                      label="MATCHES TÉCNICOS"
                      value={engine.technicalMatches}
                    />
                    <MetricCard
                      label="OPPORTUNITIES ELIGIBLE"
                      value={engine.eligibleOpportunities}
                    />
                  </>
                )}
              </div>
            </section>
          ))
        ) : (
          <EmptyState
            title="Motores aguardando integração"
            detail="Nenhuma telemetria recebida. Legacy operacional e V2 Shadow terão contextos separados."
          />
        )}
      </div>
    </>
  );
}
