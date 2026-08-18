import Link from "next/link";
import { Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { StatusBadge } from "@/components/admin/status-badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { getAllCategories } from "@/features/categories/queries";
import { deleteCategory } from "@/features/categories/actions";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const categories = await getAllCategories().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Categorias"
        description="Categorias que organizam o ecossistema Elevon."
        newHref="/admin/categorias/novo"
        newLabel="Nova categoria"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">Slug</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 font-medium">{category.name}</td>
                  <td className="px-6 py-4 text-slate-500">{category.slug}</td>
                  <td className="px-6 py-4">
                    <StatusBadge active={category.active} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/categorias/${category.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      <ConfirmDeleteButton action={deleteCategory.bind(null, category.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categories.length === 0 && (
            <EmptyState
              title="Nenhuma categoria ainda"
              description="Crie a primeira categoria para organizar links, produtos e projetos."
            />
          )}
        </div>
      </section>
    </div>
  );
}
