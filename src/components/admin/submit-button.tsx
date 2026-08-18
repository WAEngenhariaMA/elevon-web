"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring w-full rounded-lg bg-[#0B1320] py-3 text-sm font-bold text-white disabled:opacity-60 sm:w-auto sm:px-8"
    >
      {pending ? "Salvando..." : children}
    </button>
  );
}
