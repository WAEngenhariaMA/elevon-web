import Link from "next/link";
import { Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { getAllSettings } from "@/features/settings/queries";
import { settingValueToText } from "@/lib/settings";
import { deleteSetting } from "@/features/settings/actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const settings = await getAllSettings().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Configurações"
        description="Pares chave/valor usados pelo site (ex.: textos, links padrão, flags)."
        newHref="/admin/configuracoes/novo"
        newLabel="Nova configuração"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Chave</th>
                <th className="px-6 py-4 font-semibold">Valor</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {settings.map((setting) => (
                <tr key={setting.id}>
                  <td className="px-6 py-4 font-mono text-sm font-medium">{setting.key}</td>
                  <td className="max-w-100 truncate px-6 py-4 text-slate-500">
                    {settingValueToText(setting.value)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/configuracoes/${setting.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      <ConfirmDeleteButton action={deleteSetting.bind(null, setting.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {settings.length === 0 && (
            <EmptyState
              title="Nenhuma configuração ainda"
              description="Crie pares chave/valor para parametrizar o site."
            />
          )}
        </div>
      </section>
    </div>
  );
}
