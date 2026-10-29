import s from "./iq-elevon.module.css";
export function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number | string | null;
}) {
  return (
    <div className={s.metric}>
      <span>{label}</span>
      <strong>{value ?? "—"}</strong>
    </div>
  );
}
