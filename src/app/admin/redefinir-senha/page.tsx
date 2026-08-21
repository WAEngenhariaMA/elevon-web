"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirm_password") ?? "");

    setError("");

    if (password.length < 8) {
      setError("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/auth/update-password", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        setError("Não foi possível atualizar a senha. Solicite um novo link de recuperação.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Não foi possível atualizar a senha. Solicite um novo link de recuperação.");
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
        <h1 className="mt-10 text-2xl font-semibold">Redefinir senha</h1>
        <p className="mt-2 text-sm text-slate-600">Escolha uma nova senha para acessar a administração.</p>

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {success ? (
          <div className="mt-7">
            <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              Senha atualizada com sucesso.
            </p>
            <Link
              href="/admin/login"
              className="focus-ring mt-6 block w-full rounded-lg bg-[#0B1320] py-3 text-center text-sm font-bold text-white"
            >
              Ir para o login
            </Link>
          </div>
        ) : (
          <>
            <label className="mt-7 block text-sm font-medium">
              Nova senha
              <input
                required
                minLength={8}
                name="password"
                type="password"
                autoComplete="new-password"
                className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </label>

            <label className="mt-4 block text-sm font-medium">
              Confirmar nova senha
              <input
                required
                minLength={8}
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </label>

            <button
              disabled={isPending}
              className="focus-ring mt-7 w-full rounded-lg bg-[#0B1320] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Atualizando..." : "Atualizar senha"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
