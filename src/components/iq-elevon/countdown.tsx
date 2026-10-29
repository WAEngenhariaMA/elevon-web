"use client";
import { useEffect, useState } from "react";
import { secondsRemaining, windowState } from "@/features/iq-elevon/format";
import s from "./iq-elevon.module.css";

export function Countdown({
  target,
  initialNow,
  variant = "compact",
  endedLabel = "CONCLUÍDA",
}: {
  target: string;
  initialNow: string;
  variant?: "window" | "compact" | "seconds";
  endedLabel?: string;
}) {
  const [now, setNow] = useState(() => Date.parse(initialNow));
  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = window.setInterval(update, 250);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, [target]);
  // Never show a time earlier than the received snapshot if the local clock lags.
  // The countdown still derives exclusively from the supplied absolute deadline.
  const seconds = secondsRemaining(
    target,
    Math.max(now, Date.parse(initialNow)),
  );
  const state = windowState(seconds);
  if (variant !== "window")
    return (
      <span className={s.timer} role="timer" aria-label="Tempo restante">
        {seconds > 0
          ? variant === "seconds"
            ? `${seconds}s`
            : `${Math.floor(seconds / 60)
                .toString()
                .padStart(
                  2,
                  "0",
                )}:${(seconds % 60).toString().padStart(2, "0")}`
          : endedLabel}
      </span>
    );
  return (
    <div
      className={s.window}
      data-state={state}
      data-deadline={target}
      data-urgent={seconds > 0 && seconds <= 3}
    >
      <div>
        <span className={s.windowLabel}>JANELA DE EXECUÇÃO</span>
        <p className={s.windowState} role="status">
          {state === "EXPIRED"
            ? "JANELA ENCERRADA"
            : state === "CLOSING"
              ? seconds <= 3
                ? "CLOSING • URGENTE"
                : "CLOSING • ATENÇÃO"
              : "READY • DISPONÍVEL"}
        </p>
      </div>
      <strong role="timer" aria-label="Segundos restantes na janela">
        {state === "EXPIRED"
          ? "00s"
          : `${seconds.toString().padStart(2, "0")}s`}
      </strong>
    </div>
  );
}
