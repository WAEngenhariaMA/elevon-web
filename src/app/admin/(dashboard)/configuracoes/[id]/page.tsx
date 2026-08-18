import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SettingForm } from "../setting-form";
import { getSettingById } from "@/features/settings/queries";
import { updateSetting } from "@/features/settings/actions";

export default async function EditSettingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const setting = await getSettingById(id);
  if (!setting) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/configuracoes"
        className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600"
      >
        <ArrowLeft size={16} /> Voltar às configurações
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar configuração</h1>
      <SettingForm setting={setting} action={updateSetting.bind(null, id)} />
    </div>
  );
}
