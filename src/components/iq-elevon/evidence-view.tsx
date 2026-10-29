import type { IqElevonSnapshot } from "@/features/iq-elevon/types";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";
export function EvidenceView({ data }: { data: IqElevonSnapshot }) {
  return (
    <>
      <h2 className={s.title}>Evidências</h2>
      <p className={s.description}>
        Trilhas de observação e checkpoints. Nenhum resultado é presumido sem
        uma fonte.
      </p>
      <div className={s.health}>
        {data.evidence.map((item) => (
          <article className={s.card} key={item.id}>
            <div className={s.row}>
              <h3>
                <span className={s.evidenceId}>{item.id}</span>
              </h3>
              <StatusPill label={item.state ?? "SEM DADOS"} />
            </div>
            <p>{item.detail}</p>
            <small>Última atualização: {item.updatedAt ?? "—"}</small>
          </article>
        ))}
      </div>
      <div className={`${s.card} mt-6`}>
        <span className={s.eyebrow}>ESTADOS PREVISTOS NO CONTRATO</span>
        <div className={`${s.row} mt-4`}>
          {[
            "COLLECTING",
            "INTERIM",
            "CONTINUE_OBSERVATION",
            "WARMING",
            "CHECKPOINT_REACHED",
          ].map((state) => (
            <StatusPill key={state} label={state} />
          ))}
        </div>
        <p className={s.description}>
          Referência de estados visuais. Não representam o andamento atual de
          uma validação.
        </p>
      </div>
    </>
  );
}
