import type { IqDirection } from "@/features/iq-elevon/types";
import s from "./iq-elevon.module.css";
export function Direction({ value }: { value: IqDirection }) {
  return (
    <span className={`${s.direction} ${value === "CALL" ? s.call : s.put}`}>
      {value} <span aria-hidden="true">{value === "CALL" ? "↑" : "↓"}</span>
    </span>
  );
}
