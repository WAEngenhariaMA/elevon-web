import Link from "next/link";
import { Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { StatusBadge } from "@/components/admin/status-badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { getAllBanners } from "@/features/banners/queries";
import { deleteBanner } from "@/features/banners/actions";

export default async function BannersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const banners = await getAllBanners().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Banners"
        description="Destaques exibidos na página inicial."
        newHref="/admin/banners/novo"
        newLabel="Novo banner"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Título</th>
                <th className="px-6 py-4 font-semibold">Botão</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4 font-medium">{banner.title}</td>
                  <td className="px-6 py-4 text-slate-500">{banner.cta_text ?? "—"}</td>
                  <td className="px-6 py-4">
                    <StatusBadge active={banner.active} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/banners/${banner.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      <ConfirmDeleteButton action={deleteBanner.bind(null, banner.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {banners.length === 0 && (
            <EmptyState title="Nenhum banner ainda" description="Crie o primeiro banner de destaque." />
          )}
        </div>
      </section>
    </div>
  );
}
