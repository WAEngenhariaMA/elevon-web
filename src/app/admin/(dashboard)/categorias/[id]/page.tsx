import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CategoryForm } from "../category-form";
import { getCategoryById } from "@/features/categories/queries";
import { updateCategory } from "@/features/categories/actions";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/categorias" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar às categorias
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar categoria</h1>
      <CategoryForm category={category} action={updateCategory.bind(null, id)} />
    </div>
  );
}
