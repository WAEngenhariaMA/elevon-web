"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function ConfirmDeleteButton({
  action,
  confirmMessage = "Excluir este registro? Esta ação não pode ser desfeita.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      aria-label="Excluir"
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 size={14} /> {isPending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
