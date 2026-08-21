import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { StatusBadge, FeaturedBadge } from "@/components/admin/status-badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { getAllProjects } from "@/features/projects/queries";
import { deleteProject } from "@/features/projects/actions";

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const projects = await getAllProjects().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Projetos"
        description="Cases, projetos e entregas da Elevon."
        newHref="/admin/projetos/novo"
        newLabel="Novo projeto"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Título</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Visibilidade</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 font-medium">
                    {project.title}
                    <FeaturedBadge featured={project.featured} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{project.category?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{statusLabels[project.status] ?? project.status}</td>
                  <td className="px-6 py-4">
                    <StatusBadge active={project.active} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/projetos/${project.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      {project.active &&
                        (project.status === "em_andamento" || project.status === "concluido") && (
                          <Link
                            href={`/projetos/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-[#0B1320]"
                          >
                            <ExternalLink size={14} /> Ver página
                          </Link>
                        )}
                      <ConfirmDeleteButton action={deleteProject.bind(null, project.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {projects.length === 0 && (
            <EmptyState title="Nenhum projeto ainda" description="Cadastre o primeiro case da Elevon." />
          )}
        </div>
      </section>
    </div>
  );
}
