"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsPending(true);

    try {
      const response = await fetch("/auth/forgot-password", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) {
        setError("Não foi possível enviar o link agora. Tente novamente.");
        return;
      }

      setMessage(
        "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
      );
    } catch {
      setError("Não foi possível enviar o link agora. Tente novamente.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0B1320] p-6">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <Link href="/" className="text-lg font-bold tracking-[.18em]">
          ELE<span className="text-[#D4AF37]">VON</span>
        </Link>
        <h1 className="mt-10 text-2xl font-semibold">Recuperar acesso</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enviaremos um link para redefinir a senha do e-mail cadastrado.
        </p>

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
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

        <button
          disabled={isPending}
          className="focus-ring mt-7 w-full rounded-lg bg-[#0B1320] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Enviando..." : "Enviar link de recuperação"}
        </button>

        <Link
          href="/admin/login"
          className="focus-ring mt-6 block text-center text-sm font-medium text-slate-600 hover:text-[#0B1320]"
        >
          Voltar para o login
        </Link>
      </form>
    </main>
  );
}
