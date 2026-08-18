import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../product-form";
import { createProduct } from "@/features/products/actions";
import { getAllCategories } from "@/features/categories/queries";

export default async function NewProductPage() {
  const categories = await getAllCategories().catch(() => []);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/produtos" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos produtos
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Novo produto</h1>
      <ProductForm categories={categories} action={createProduct} />
    </div>
  );
}
