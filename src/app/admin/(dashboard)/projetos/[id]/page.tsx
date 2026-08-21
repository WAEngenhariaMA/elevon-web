import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "../project-form";
import { getAllProjects, getProjectById } from "@/features/projects/queries";
import { updateProject } from "@/features/projects/actions";
import { getAllCategories } from "@/features/categories/queries";
import { getProjectMedia } from "@/features/projects/media-queries";
import { ProjectMediaManager } from "@/components/admin/project-media-manager";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let project = await getProjectById(id).catch(() => null);
  if (!project) {
    const projects = await getAllProjects().catch(() => []);
    project = projects.find((item) => item.slug === id) ?? null;
  }
  if (!project) notFound();

  const [categories, media] = await Promise.all([
    getAllCategories().catch(() => []),
    getProjectMedia(project.id).catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/projetos" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos projetos
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar projeto</h1>
      <ProjectForm
        project={project}
        categories={categories}
        action={updateProject.bind(null, project.id, project.image_url, project.architecture_image_url)}
      />
      <ProjectMediaManager projectId={project.id} media={media} />
    </div>
  );
}
