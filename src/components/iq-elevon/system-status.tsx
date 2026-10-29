import type { IqSystemStatus } from "@/features/iq-elevon/types";
import { StatusPill } from "./status-pill";
import s from "./iq-elevon.module.css";
export function SystemStatus({ status }: { status: IqSystemStatus }) {
  const render = (items: IqSystemStatus["items"]) =>
    items.map((item) => (
      <div key={item.id} className={s.statusItem}>
        <span>{item.label}</span>
        <StatusPill label={item.state} />
      </div>
    ));
  return (
    <section className={s.card} aria-label="Status global">
      <div className={s.cardTop}>
        <h2 className={s.eyebrow}>STATUS GLOBAL</h2>
        <span className={s.eyebrow}>SOMENTE LEITURA</span>
      </div>
      <div className={s.statusGrid}>{render(status.items.slice(0, 3))}</div>
      <details className={s.details}>
        <summary>Ver todos os serviços</summary>
        <div className={s.statusGrid}>{render(status.items.slice(3, 8))}</div>
      </details>
    </section>
  );
}
