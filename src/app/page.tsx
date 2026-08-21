import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, Code2, Package, Workflow, Wrench } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Ecosystem } from "@/components/sections/ecosystem";
import { getActiveProjects } from "@/features/projects/queries";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { verticals } from "@/config/brand";

const pillars = [
  {
    title: "Automação de processos",
    description: "Reduza tarefas repetitivas, conecte fluxos e ganhe eficiência operacional.",
    icon: Workflow,
  },
  {
    title: "IA aplicada ao negócio",
    description: "Agentes, assistentes e soluções inteligentes para apoiar decisões e operações.",
    icon: BrainCircuit,
  },
  {
    title: "Sistemas e portais",
    description: "Desenvolvimento de sistemas internos, portais, ferramentas e soluções sob medida.",
    icon: Code2,
  },
  {
    title: "Dados e inteligência",
    description: "Dashboards, indicadores e análises que transformam dados em decisões.",
    icon: BarChart3,
  },
  {
    title: "Engenharia digital",
    description: "Engenharia integrada a dados, automação, planejamento, gestão e tecnologia.",
    icon: Wrench,
  },
  {
    title: "Produtos digitais",
    description: "Ferramentas, conteúdos e produtos escaláveis desenvolvidos dentro do ecossistema Elevon.",
    icon: Package,
  },
] as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elevon",
  url: "https://elevon.digital.br",
  description:
    "A ELEVON é uma empresa de engenharia e tecnologia que integra inteligência artificial, automação, dados e software para transformar desafios reais em soluções eficientes, inteligentes e escaláveis.",
  slogan: "Evolução • Tecnologia • Resultados",
};

const projectStatusLabels = {
  concluido: "Concluído",
  em_andamento: "Em andamento",
  draft: "",
} as const;

export default async function Home() {
  const projects = (await getActiveProjects())
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <main>
        <section className="grid-glow relative overflow-hidden bg-[#0B1320] px-6 pb-24 pt-28 text-white sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
          <div className="absolute -right-32 top-12 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
          <div className="absolute left-1/3 top-40 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="mb-6 text-xs font-bold tracking-[.28em] text-[#D4AF37]">
                EVOLUÇÃO • TECNOLOGIA • RESULTADOS
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
                Engenharia e tecnologia para transformar desafios em{" "}
                <span className="text-[#D4AF37]">resultados.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A ELEVON integra engenharia, inteligência artificial, automação, dados e software
                para criar soluções eficientes, inteligentes e escaláveis.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="#solucoes"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#0B1320]"
                >
                  Conheça nossas soluções <ArrowRight size={17} />
                </Link>
                <Link
                  href="#contato"
                  className="focus-ring rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold hover:border-[#D4AF37]"
                >
                  Fale com a Elevon
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-lg justify-self-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1320] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/elevon-ecosystem.png"
                alt="Ecossistema ELEVON conectando Engenharia, Inteligência Artificial, Digital, Academy e Labs"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>

        <Ecosystem />

        <section id="solucoes" className="bg-slate-50 px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold tracking-[.22em] text-[#2563EB]">
              SOLUÇÕES ELEVON
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Tecnologia aplicada a problemas reais.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Da automação ao software, da inteligência artificial à engenharia: desenvolvemos soluções para aumentar eficiência, controle e capacidade de decisão.
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <Icon className="text-[#2563EB]" size={25} />
                  <h3 className="mt-7 text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {projects.length > 0 && (
          <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold tracking-[.22em] text-[#2563EB]">
                PROJETOS &amp; SOLUÇÕES
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Soluções construídas para desafios reais.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Conheça projetos que integram engenharia, tecnologia, dados, automação e inteligência para transformar operações e negócios.
              </p>

              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                  const vertical = verticals.find((item) => item.name.toLowerCase() === project.category?.name?.toLowerCase());
                  const accentColor = vertical?.color ?? "#2563EB";
                  const summary = project.subtitle ?? project.description;
                  return <article key={project.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300">
                    <div className="relative aspect-[16/10] bg-[#0B1320] p-4">
                      {project.image_url ? <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.image_url} alt={project.title} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                      </> : <p className="flex h-full items-end text-sm font-bold tracking-[.16em]" style={{ color: accentColor }}>{vertical?.name ?? "ELEVON"}</p>}
                    </div>
                    <div className="p-6"><div className="flex items-center justify-between gap-4"><p className="text-xs font-bold tracking-[.16em]" style={{ color: accentColor }}>{project.category?.name ?? "ELEVON"}</p><span className="text-xs font-medium text-slate-500">{projectStatusLabels[project.status]}</span></div><h3 className="mt-5 text-xl font-semibold tracking-tight">{project.title}</h3>{summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>}<Link href={`/projetos/${project.slug}`} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: accentColor }}>Ver case <ArrowRight size={16} /></Link></div>
                  </article>;
                })}
              </div>
            </div>
          </section>
        )}

        <section id="contato" className="bg-[#0B1320] px-6 py-20 text-center text-white">
          <p className="text-xs font-bold tracking-[.24em] text-[#D4AF37]">VAMOS EVOLUIR</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Sua próxima solução pode começar agora.
          </h2>
          <WhatsAppLink
            href={buildWhatsAppUrl()}
            source="home_contato"
            className="focus-ring mt-8 inline-block rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#0B1320]"
          >
            Falar com a Elevon
          </WhatsAppLink>
        </section>
      </main>
      <Footer />
    </>
  );
}
