import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Clock3,
  Cpu,
  Layers3,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";
import type { IqElevonSnapshot, IqView } from "@/features/iq-elevon/types";
import { clockTime } from "@/features/iq-elevon/format";
import s from "./iq-elevon.module.css";

const views = [
  { id: "operacao", label: "Operação", icon: Activity },
  { id: "historico", label: "Histórico", icon: Clock3 },
  { id: "motores", label: "Motores", icon: Cpu },
  { id: "evidencias", label: "Evidências", icon: Layers3 },
  { id: "sistema", label: "Sistema", icon: SlidersHorizontal },
] as const;
export function IqShell({
  snapshot,
  view,
  children,
}: {
  snapshot: IqElevonSnapshot;
  view: IqView;
  children: ReactNode;
}) {
  const online =
    snapshot.system.items.find((item) => item.label === "Sistema")?.state ===
    "ONLINE";
  return (
    <div className={s.portal}>
      <header className={s.header}>
        <div className={s.headerTop}>
          <div className={s.brand}>
            <div className={s.brandIcon}>
              <Activity size={25} aria-hidden="true" />
            </div>
            <div>
              <h1>IQ ELEVON</h1>
              <p className={s.subtitle}>Trading Intelligence</p>
            </div>
          </div>
          <div className={s.headerMeta}>
            <span className={s.manual}>MANUAL EXECUTION</span>
            <span className={s.operational}>
              <span className={s.dot} aria-hidden="true" />
              {online ? "SISTEMA OPERACIONAL" : "SISTEMA DESCONECTADO"}
            </span>
          </div>
        </div>
        <nav className={s.nav} aria-label="IQ Elevon">
          {views.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              href={
                id === "operacao"
                  ? "/admin/iq-elevon"
                  : `/admin/iq-elevon?view=${id}`
              }
              prefetch={false}
              aria-current={view === id ? "page" : undefined}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <div className={s.body}>
        <div className={s.demo}>
          {snapshot.mode === "demo" ? (
            <>
              <Radio size={15} aria-hidden="true" />
              <strong>DEMO DATA</strong>
              <span>
                Ambiente visual · dados locais simulados · nenhuma ordem é
                enviada.
              </span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} aria-hidden="true" />
              <strong>SEM INTEGRAÇÃO</strong>
              <span>
                Fonte de dados não conectada. Aguardando integração futura.
              </span>
            </>
          )}
        </div>
        {children}
        <footer className={s.footer}>
          <span>
            IQ ELEVON{" "}
            <ArrowUpRight size={11} className="inline" aria-hidden="true" />{" "}
            TRADING INTELLIGENCE
          </span>
          <span>
            Horários de Brasília (UTC−03) ·{" "}
            {snapshot.mode === "demo" ? "Snapshot demo" : "Interface"}{" "}
            {clockTime(snapshot.generatedAt)}
          </span>
        </footer>
      </div>
    </div>
  );
}
