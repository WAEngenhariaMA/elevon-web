import { ScanLine } from "lucide-react";
import s from "./iq-elevon.module.css";
export function EmptyState({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className={s.empty}>
      <ScanLine size={24} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
}
