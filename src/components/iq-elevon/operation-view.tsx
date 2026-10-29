import type { IqElevonSnapshot } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import { ActiveTradeCard } from "./active-trade-card";
import { ConfirmedSignalCard } from "./confirmed-signal-card";
import { EmptyState } from "./empty-state";
import { PreAlertCard } from "./pre-alert-card";
import { SystemStatus } from "./system-status";
import { V2ShadowCard } from "./v2-shadow-card";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";

export function OperationView({ data }: { data: IqElevonSnapshot }) {
  return (
    <>
      <div className={s.sectionHeading}>
        <div>
          <h2 className={s.title}>Visão de operação</h2>
          <p className={s.description}>
            Contexto primeiro. Decisão no seu tempo.
          </p>
        </div>
        <span className={s.eyebrow}>WORKSPACE / 01</span>
      </div>
      <SystemStatus status={data.system} />
      <div className={s.operationGrid}>
        <div>
          <section className={s.section}>
            <div className={s.sectionHeading}>
              <h2>Pré-alertas</h2>
              <span className={s.eyebrow}>PREPARAÇÃO</span>
            </div>
            <div className={s.stack}>
              {data.preAlerts.length ? (
                data.preAlerts.map((alert) => (
                  <PreAlertCard
                    key={alert.id}
                    alert={alert}
                    now={data.generatedAt}
                  />
                ))
              ) : (
                <EmptyState
                  title="Nenhum pré-alerta"
                  detail="Os pré-alertas aparecerão aqui quando uma fonte estiver conectada."
                />
              )}
            </div>
          </section>
          <section className={s.section}>
            <div className={s.sectionHeading}>
              <h2>Sinais confirmados</h2>
              <span className={s.eyebrow}>LEGACY / MANUAL</span>
            </div>
            <div className={s.stack}>
              {data.confirmedSignals.length ? (
                data.confirmedSignals.map((signal) => (
                  <ConfirmedSignalCard
                    key={signal.id}
                    signal={signal}
                    now={data.generatedAt}
                  />
                ))
              ) : (
                <EmptyState
                  title="Nenhum sinal confirmado"
                  detail="Aguardando dados do motor Legacy. Nenhuma ação disponível."
                />
              )}
            </div>
          </section>
          <section className={s.section}>
            <div className={s.sectionHeading}>
              <h2>Operações em andamento</h2>
              <span className={s.eyebrow}>
                {data.activeTrades.length} EM ACOMPANHAMENTO
              </span>
            </div>
            <div className={s.stack}>
              {data.activeTrades.length ? (
                data.activeTrades.map((trade) => (
                  <ActiveTradeCard
                    key={trade.id}
                    trade={trade}
                    now={data.generatedAt}
                  />
                ))
              ) : (
                <EmptyState
                  title="Nenhuma operação em andamento"
                  detail="O acompanhamento será exibido após a integração."
                />
              )}
            </div>
          </section>
        </div>
        <div>
          <section
            className={`${s.section} ${s.shadowSection}`}
            aria-label="V2 Operational Shadow"
          >
            <div className={s.sectionHeading}>
              <h2>V2 OPERATIONAL SHADOW</h2>
              <StatusPill label="NÃO EXECUTA ORDENS" tone="shadowTone" />
            </div>
            <p className={s.description}>
              Observação técnica em paralelo. Oportunidades e bloqueios
              registrados separadamente do Legacy.
            </p>
            <div className={`${s.stack} mt-4`}>
              {data.shadowOpportunities.length ? (
                data.shadowOpportunities.map((opportunity) => (
                  <V2ShadowCard
                    key={opportunity.id}
                    opportunity={opportunity}
                  />
                ))
              ) : (
                <EmptyState
                  title="Shadow aguardando dados"
                  detail="Nenhuma oportunidade técnica recebida."
                />
              )}
            </div>
          </section>
          <section className={s.section}>
            <div className={s.sectionHeading}>
              <h2>Resumo do sistema</h2>
            </div>
            <div className={s.card}>
              <span className={s.eyebrow}>CONTEXTO DO WORKSPACE</span>
              <dl className={s.fields}>
                <div>
                  <dt>Modo operacional</dt>
                  <dd>Manual</dd>
                </div>
                <div>
                  <dt>Fonte</dt>
                  <dd>
                    {data.mode === "demo" ? "Fixture local" : "Não conectada"}
                  </dd>
                </div>
                <div>
                  <dt>Última atualização</dt>
                  <dd>{clockTime(data.system.updatedAt)}</dd>
                </div>
                <div>
                  <dt>Automação de ordens</dt>
                  <dd>Não disponível</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
