import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { verticals } from "@/config/brand";
import { whatsAppUrlForVertical } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

type Props = { params: Promise<{ vertical: string }> };

const solutions = [
  "Diagnóstico e estratégia",
  "Soluções sob medida",
  "Acompanhamento de resultados",
];

export function generateStaticParams() {
  return verticals.map(({ slug }) => ({ vertical: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical } = await params;
  const item = verticals.find((v) => v.slug === vertical);
  if (!item) return { title: "Elevon" };
  return {
    title: item.name,
    description: item.description,
    alternates: { canonical: `/${item.slug}` },
    openGraph: { title: item.name, description: item.description },
  };
}

export default async function Vertical({ params }: Props) {
  const { vertical } = await params;
  const item = verticals.find((v) => v.slug === vertical);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    provider: { "@type": "Organization", name: "Elevon" },
    description: item.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0B1320] px-6 py-24 text-white sm:px-10 lg:px-16">
          <div
            className="absolute right-0 top-0 h-full w-1/2 opacity-20"
            style={{ background: `radial-gradient(circle at 70% 40%, ${item.color}, transparent 50%)` }}
          />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-xs font-bold tracking-[.25em]" style={{ color: item.color }}>
              {item.eyebrow.toUpperCase()}
            </p>
            <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">{item.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{item.description}</p>
            <Link
              href="#contato"
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#0B1320]"
              style={{ background: item.color }}
            >
              Falar com especialista <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-[.22em] text-[#2563EB]">SOLUÇÕES</p>
              <h2 className="mt-4 text-3xl font-semibold">Da oportunidade à evolução concreta.</h2>
            </div>
            <ul className="space-y-5">
              {solutions.map((solution) => (
                <li key={solution} className="flex gap-3 border-b border-slate-100 pb-5">
                  <CheckCircle2 size={20} style={{ color: item.color }} />
                  <span className="font-medium">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contato" className="bg-slate-50 px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">Vamos criar o próximo passo?</h2>
          <WhatsAppLink
            className="focus-ring mt-6 inline-block rounded-full bg-[#0B1320] px-6 py-3.5 text-sm font-bold text-white"
            href={whatsAppUrlForVertical(item.slug)}
            source={`vertical_${item.slug}`}
          >
            Conversar no WhatsApp
          </WhatsAppLink>
        </section>
      </main>
      <Footer />
    </>
  );
}
