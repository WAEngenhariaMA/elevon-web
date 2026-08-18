"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const res = await fetch("/auth/login", { method: "POST", body: form });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Não foi possível entrar. Verifique seus dados.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0B1320] p-6">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <Link href="/" className="text-lg font-bold tracking-[.18em]">
          ELE<span className="text-[#D4AF37]">VON</span>
        </Link>
        <h1 className="mt-10 text-2xl font-semibold">Acesso administrativo</h1>
        <p className="mt-2 text-sm text-slate-600">Entre para gerenciar o ecossistema Elevon.</p>

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="mt-7 block text-sm font-medium">
          E-mail
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
          />
        </label>

        <label className="mt-4 block text-sm font-medium">
          Senha
          <input
            required
            name="password"
            type="password"
            autoComplete="current-password"
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
          />
        </label>

        <button className="focus-ring mt-7 w-full rounded-lg bg-[#0B1320] py-3 text-sm font-bold text-white">
          Entrar
        </button>
      </form>
    </main>
  );
}
