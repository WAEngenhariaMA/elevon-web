import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "../project-form";
import { createProject } from "@/features/projects/actions";
import { getAllCategories } from "@/features/categories/queries";

export default async function NewProjectPage() {
  const categories = await getAllCategories().catch(() => []);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/projetos" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos projetos
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Novo projeto</h1>
      <ProjectForm categories={categories} action={createProject} />
    </div>
  );
}
