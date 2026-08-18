import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SettingForm } from "../setting-form";
import { createSetting } from "@/features/settings/actions";

export default function NewSettingPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/configuracoes"
        className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600"
      >
        <ArrowLeft size={16} /> Voltar às configurações
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Nova configuração</h1>
      <SettingForm action={createSetting} />
    </div>
  );
}
