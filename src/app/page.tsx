import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, Cpu, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Ecosystem } from "@/components/sections/ecosystem";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

const pillars = [
  {
    title: "Estratégia aplicada",
    description: "Tecnologia só importa quando cria avanços mensuráveis.",
    icon: BarChart3,
  },
  {
    title: "Inteligência integrada",
    description: "Dados, engenharia e IA atuando como um único ecossistema.",
    icon: BrainCircuit,
  },
  {
    title: "Execução robusta",
    description: "Produtos e operações desenhados para escalar com confiança.",
    icon: ShieldCheck,
  },
] as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elevon",
  url: "https://elevon.digital.br",
  description:
    "A Elevon conecta engenharia, inteligência artificial, dados, tecnologia e produtos digitais para criar soluções que geram evolução real.",
  slogan: "Evolução • Tecnologia • Resultados",
};

export default function Home() {
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
                Tecnologia que transforma conhecimento em{" "}
                <span className="text-[#D4AF37]">resultados.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A Elevon conecta engenharia, inteligência artificial, dados, tecnologia e
                produtos digitais para criar soluções que geram evolução real.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="#ecossistema"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#0B1320]"
                >
                  Conheça a Elevon <ArrowRight size={17} />
                </Link>
                <Link
                  href="#solucoes"
                  className="focus-ring rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold hover:border-[#D4AF37]"
                >
                  Ver soluções
                </Link>
              </div>
            </div>

            <div className="relative aspect-square max-w-lg justify-self-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#152a4b] via-[#0e1c31] to-[#0B1320] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,.38),transparent_22%),radial-gradient(circle_at_28%_68%,rgba(37,99,235,.45),transparent_28%)]" />
              <div className="relative flex h-full flex-col justify-end border border-white/10 p-6">
                <Cpu className="mb-auto text-[#D4AF37]" size={38} />
                <p className="text-xs font-bold tracking-[.25em] text-slate-300">
                  ELEVON ECOSYSTEM
                </p>
                <p className="mt-2 text-2xl font-semibold">Onde ideias ganham escala.</p>
              </div>
            </div>
          </div>
        </section>

        <Ecosystem />

        <section id="solucoes" className="bg-slate-50 px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold tracking-[.22em] text-[#2563EB]">
              NOSSA FORMA DE CONSTRUIR
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Conhecimento que se torna infraestrutura para crescer.
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
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
