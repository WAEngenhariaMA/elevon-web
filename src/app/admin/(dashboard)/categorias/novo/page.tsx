import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryForm } from "../category-form";
import { createCategory } from "@/features/categories/actions";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/categorias" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar às categorias
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Nova categoria</h1>
      <CategoryForm action={createCategory} />
    </div>
  );
}
