import Link from "next/link";
import { Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { StatusBadge, FeaturedBadge } from "@/components/admin/status-badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { getAllLinks } from "@/features/links/queries";
import { deleteLink } from "@/features/links/actions";

export default async function LinksPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const links = await getAllLinks().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Links"
        description="Links exibidos na bio e nas páginas públicas."
        newHref="/admin/links/novo"
        newLabel="Novo link"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Título</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Ordem</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {links.map((link) => (
                <tr key={link.id}>
                  <td className="px-6 py-4 font-medium">
                    {link.title}
                    <FeaturedBadge featured={link.featured} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{link.category?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{link.sort_order}</td>
                  <td className="px-6 py-4">
                    <StatusBadge active={link.active} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/links/${link.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      <ConfirmDeleteButton action={deleteLink.bind(null, link.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {links.length === 0 && (
            <EmptyState
              title="Nenhum link ainda"
              description="Crie o primeiro link para exibir na página /links."
            />
          )}
        </div>
      </section>
    </div>
  );
}
