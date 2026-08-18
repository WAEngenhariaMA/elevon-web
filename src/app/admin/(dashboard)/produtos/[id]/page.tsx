import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../product-form";
import { getProductById } from "@/features/products/queries";
import { updateProduct } from "@/features/products/actions";
import { getAllCategories } from "@/features/categories/queries";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), getAllCategories().catch(() => [])]);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/produtos" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos produtos
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar produto</h1>
      <ProductForm
        product={product}
        categories={categories}
        action={updateProduct.bind(null, id, product.image_url)}
      />
    </div>
  );
}
