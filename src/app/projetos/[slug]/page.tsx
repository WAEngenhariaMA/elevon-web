import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicProjectBySlug } from "@/features/projects/queries";
import { getActiveProjectMedia } from "@/features/projects/media-queries";
import { ProjectCaseLanding } from "@/components/projects/project-case-landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto | ELEVON", description: "Projetos e soluções da ELEVON." };
  }

  return {
    title: `${project.title} | ELEVON`,
    description: project.description ?? project.subtitle ?? undefined,
  };
}

export default async function PublicProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) notFound();

  const media = await getActiveProjectMedia(project.id);
  return <ProjectCaseLanding project={project} media={media} />;
}
