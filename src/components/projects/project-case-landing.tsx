import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Layers3 } from "lucide-react";
import type { Project } from "@/types";
import type { ProjectMedia } from "@/features/projects/media-queries";
import { verticals } from "@/config/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectGallery } from "@/components/projects/project-gallery";

export function ProjectCaseLanding({ project, media }: { project: Project; media: ProjectMedia[] }) {
  const categoryName = project.category?.name?.toLowerCase();
  const vertical = verticals.find((item) => item.name.toLowerCase() === categoryName);
  const accentColor = vertical?.color ?? "#D4AF37";
  const verticalThemes = {
    engenharia: { background: "#081321", surface: "#0D1B2A", glowOpacity: 0.22 },
    ai: { background: "#071815", surface: "#0B211D", glowOpacity: 0.2 },
    digital: { background: "#120D1D", surface: "#1A1229", glowOpacity: 0.2 },
    academy: { background: "#17130A", surface: "#211A0C", glowOpacity: 0.16 },
    labs: { background: "#180F0A", surface: "#25150D", glowOpacity: 0.18 },
  } as const;
  const theme =
    vertical && vertical.slug in verticalThemes
      ? verticalThemes[vertical.slug as keyof typeof verticalThemes]
      : { background: "#0B1320", surface: "#111C2B", glowOpacity: 0.18 };
  const statusLabel = project.status === "em_andamento" ? "Em desenvolvimento" : "Projeto concluído";
  const heroText = project.subtitle ?? project.description;
  const ctaTitle = project.cta_title ?? "Sua operação tem um desafio semelhante?";
  const ctaText =
    project.cta_text ??
    "A ELEVON desenvolve soluções de engenharia e tecnologia adaptadas a desafios reais de cada operação.";
  const ctaLabel = project.cta_label ?? "Quero avaliar uma solução";
  const ctaMessage =
    project.cta_message ??
    `Olá, conheci o projeto "${project.title}" da ELEVON e gostaria de avaliar uma solução semelhante para minha operação.`;
  const whatsappUrl = buildWhatsAppUrl(ctaMessage);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: theme.background }}>
      <Header />
      <main>
        <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div
            className="absolute right-0 top-0 h-full w-2/3 blur-3xl"
            style={{ background: `radial-gradient(circle at top right, ${accentColor}, transparent 60%)`, opacity: theme.glowOpacity }}
          />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white">
              <ArrowLeft size={16} /> ELEVON / Projetos
            </Link>
            <div className={`mt-10 gap-12 lg:items-end ${project.image_url ? "grid lg:grid-cols-[1fr_.9fr]" : "max-w-4xl"}`}>
              <div className={project.image_url ? undefined : "max-w-4xl"}>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-[.18em] uppercase">
                  {project.category?.name && <span style={{ color: accentColor }}>{project.category.name}</span>}
                  <span className="rounded-full border border-white/20 px-3 py-1 text-slate-300 normal-case tracking-normal">
                    {statusLabel}
                  </span>
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{project.title}</h1>
                {heroText && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{heroText}</p>}
              </div>
              {project.image_url && (
                <div className="rounded-2xl border border-white/10 p-3" style={{ backgroundColor: theme.surface }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image_url} alt={project.title} className="max-h-120 w-full rounded-xl object-contain" />
                </div>
              )}
            </div>
          </div>
        </section>

        {project.challenge && (
          <section className="bg-white px-6 py-16 text-[#0B1320] sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl lg:max-w-4xl">
              <div className="flex items-center gap-3"><span className="h-px w-8" style={{ backgroundColor: accentColor }} /><p className="text-xs font-bold tracking-[.2em]" style={{ color: accentColor }}>O DESAFIO</p></div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">O problema que precisava ser resolvido.</h2>
              <p className="mt-7 whitespace-pre-line text-base leading-8 text-slate-600">{project.challenge}</p>
            </div>
          </section>
        )}

        {project.solution && (
          <section className="px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl lg:max-w-4xl">
              <div className="flex items-center gap-3"><span className="h-px w-8" style={{ backgroundColor: accentColor }} /><p className="text-xs font-bold tracking-[.2em]" style={{ color: accentColor }}>A SOLUÇÃO</p></div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Tecnologia aplicada ao desafio.</h2>
              <p className="mt-7 whitespace-pre-line text-base leading-8 text-slate-300">{project.solution}</p>
            </div>
          </section>
        )}

        {project.capabilities.length > 0 && (
          <section className="bg-slate-100 px-6 py-16 text-[#0B1320] sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">O que a solução é capaz de fazer</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.capabilities.map((capability) => (
                  <article key={capability} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <span className="inline-flex rounded-lg bg-slate-50 p-2"><Check size={20} style={{ color: accentColor }} /></span>
                    <p className="mt-5 text-sm font-medium leading-6">{capability}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {project.development && (
          <section className="px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl lg:max-w-4xl">
              <div className="flex items-center gap-3"><span className="h-px w-8" style={{ backgroundColor: accentColor }} /><p className="text-xs font-bold tracking-[.2em]" style={{ color: accentColor }}>DESENVOLVIMENTO</p></div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Como a solução foi construída</h2>
              <p className="mt-7 whitespace-pre-line text-base leading-8 text-slate-300">{project.development}</p>
            </div>
          </section>
        )}

        {(project.architecture_description || project.architecture_image_url) && (
          <section className="bg-white px-6 py-16 text-[#0B1320] sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl lg:max-w-5xl">
              <div className="flex items-center gap-3"><Layers3 style={{ color: accentColor }} /><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Arquitetura da solução</h2></div>
              {project.architecture_description && <p className="mt-7 whitespace-pre-line leading-8 text-slate-600">{project.architecture_description}</p>}
              {project.architecture_image_url && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.architecture_image_url} alt={`Arquitetura do projeto ${project.title}`} className="max-h-160 w-full object-contain" />
                </div>
              )}
            </div>
          </section>
        )}

        {media.length > 0 && (
          <section className="px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold tracking-[.2em]" style={{ color: accentColor }}>PROJETO EM DETALHES</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Interfaces e aplicações</h2>
              <ProjectGallery media={media} projectTitle={project.title} accentColor={accentColor} />
            </div>
          </section>
        )}

        {project.benefits.length > 0 && (
          <section className="bg-slate-100 px-6 py-16 text-[#0B1320] sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold tracking-[.2em]" style={{ color: accentColor }}>IMPACTO</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Benefícios da solução</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.benefits.map((benefit) => <p key={benefit} className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-medium leading-6"><span className="mb-4 block h-1 w-8 rounded-full" style={{ backgroundColor: accentColor }} />{benefit}</p>)}
              </div>
            </div>
          </section>
        )}

        {project.technologies.length > 0 && (
          <section className="px-6 py-14 sm:px-10 lg:px-16"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold tracking-[.2em]" style={{ color: accentColor }}>STACK</p><h2 className="mt-3 text-2xl font-semibold">Tecnologias utilizadas</h2><div className="mt-6 flex flex-wrap gap-3">{project.technologies.map((technology) => <span key={technology} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: accentColor, color: accentColor }}>{technology}</span>)}</div></div></section>
        )}

        <section className="px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto max-w-7xl rounded-3xl bg-white px-7 py-10 text-[#0B1320] sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10"><div><h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{ctaTitle}</h2><p className="mt-5 max-w-2xl leading-8 text-slate-600">{ctaText}</p></div><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-8 inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#0B1320] lg:mt-0" style={{ backgroundColor: accentColor }}>{ctaLabel}<ArrowUpRight size={17} /></a></div></section>
      </main>
      <Footer />
    </div>
  );
}
