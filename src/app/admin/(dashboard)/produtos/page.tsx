import Link from "next/link";
import { Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { StatusBadge, FeaturedBadge } from "@/components/admin/status-badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { formatBRL } from "@/lib/utils";
import { getAllProducts } from "@/features/products/queries";
import { deleteProduct } from "@/features/products/actions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const products = await getAllProducts().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Produtos"
        description="Produtos, preços e URLs de checkout."
        newHref="/admin/produtos/novo"
        newLabel="Novo produto"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Preço</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 font-medium">
                    {product.name}
                    <FeaturedBadge featured={product.featured} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{product.category?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{formatBRL(product.price)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge active={product.active} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      <ConfirmDeleteButton action={deleteProduct.bind(null, product.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <EmptyState
              title="Nenhum produto ainda"
              description="Crie o primeiro produto para exibir em /produtos."
            />
          )}
        </div>
      </section>
    </div>
  );
}
