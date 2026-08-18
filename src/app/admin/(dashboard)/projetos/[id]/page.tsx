import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "../project-form";
import { getProjectById } from "@/features/projects/queries";
import { updateProject } from "@/features/projects/actions";
import { getAllCategories } from "@/features/categories/queries";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, categories] = await Promise.all([getProjectById(id), getAllCategories().catch(() => [])]);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/projetos" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos projetos
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar projeto</h1>
      <ProjectForm
        project={project}
        categories={categories}
        action={updateProject.bind(null, id, project.image_url)}
      />
    </div>
  );
}
