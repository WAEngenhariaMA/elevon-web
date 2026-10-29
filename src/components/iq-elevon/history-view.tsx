"use client";
import { useState } from "react";
import type { IqElevonSnapshot, IqEngine } from "@/features/iq-elevon/types";
import {
  clockTime,
  historyInPeriod,
  summarizeHistory,
} from "@/features/iq-elevon/format";
import { Direction } from "./direction";
import { EmptyState } from "./empty-state";
import { MetricCard } from "./metric-card";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";

export function HistoryView({ data }: { data: IqElevonSnapshot }) {
  const [days, setDays] = useState(1);
  const records = historyInPeriod(
    data.history,
    days,
    Date.parse(data.generatedAt),
  );
  return (
    <>
      <h2 className={s.title}>Histórico</h2>
      <p className={s.description}>
        Resultados por motor. Observação Shadow e operação Legacy mantidas
        separadas.
      </p>
      <div className={s.filters} role="group" aria-label="Período do histórico">
        {[
          [1, "Hoje"],
          [7, "7 dias"],
          [30, "30 dias"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={days === value}
            onClick={() => setDays(Number(value))}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={s.stack}>
        {(["Legacy", "V2 Operational Shadow"] as IqEngine[]).map((engine) => {
          const summary = summarizeHistory(records, engine);
          const rows = records.filter((r) => r.engine === engine);
          return (
            <section
              className={s.card}
              key={engine}
              aria-label={`Histórico ${engine}`}
            >
              <div className={s.row}>
                <h3>{engine}</h3>
                <StatusPill
                  label={
                    engine === "Legacy"
                      ? "OPERACIONAL • MANUAL"
                      : "SHADOW • NÃO EXECUTA ORDENS"
                  }
                  tone={engine === "Legacy" ? "neutral" : "shadowTone"}
                />
              </div>
              {engine !== "Legacy" && (
                <p className={s.description}>
                  Desfechos de observação técnica, sem execução de ordens.
                </p>
              )}
              <div className={s.metrics}>
                <MetricCard
                  label="WIN"
                  value={data.mode === "disconnected" ? null : summary.win}
                />
                <MetricCard
                  label="LOSS"
                  value={data.mode === "disconnected" ? null : summary.loss}
                />
                <MetricCard
                  label="TIE"
                  value={data.mode === "disconnected" ? null : summary.tie}
                />
                <MetricCard
                  label="PENDING"
                  value={data.mode === "disconnected" ? null : summary.pending}
                />
              </div>
              {rows.length ? (
                rows.map((r) => (
                  <article className={s.historyRow} key={r.id}>
                    <div>
                      <strong>{r.asset}</strong> ·{" "}
                      <Direction value={r.direction} />
                      <small>
                        {new Intl.DateTimeFormat("pt-BR", {
                          timeZone: "America/Sao_Paulo",
                          day: "2-digit",
                          month: "2-digit",
                        }).format(new Date(r.occurredAt))}{" "}
                        · {clockTime(r.occurredAt)}
                      </small>
                    </div>
                    <StatusPill
                      label={r.outcome}
                      tone={
                        r.outcome === "WIN"
                          ? "positive"
                          : r.outcome === "LOSS"
                            ? "negative"
                            : "neutral"
                      }
                    />
                  </article>
                ))
              ) : (
                <div className="mt-4">
                  <EmptyState
                    title="Sem registros no período"
                    detail="Os registros aparecerão aqui quando estiverem disponíveis."
                  />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
