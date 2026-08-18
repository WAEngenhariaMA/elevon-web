import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { verticals } from "@/config/brand";

export function Ecosystem() {
  return (
    <section id="ecossistema" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold tracking-[.22em] text-[#D4AF37]">ECOSSISTEMA ELEVON</p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Cinco verticais. Uma visão de futuro.
          </h2>
          <p className="max-w-sm text-sm leading-6 text-slate-600">
            Competências conectadas para resolver desafios complexos com clareza e impacto.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {verticals.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/${vertical.slug}`}
              className="focus-ring group min-h-60 rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl"
            >
              <span className="block h-1 w-10 rounded" style={{ background: vertical.color }} />
              <ArrowUpRight className="float-right mt-4 text-slate-400 group-hover:text-[#0B1320]" />
              <h3 className="mt-20 text-lg font-bold">{vertical.name}</h3>
              <p className="mt-3 text-xs leading-5 text-slate-600">{vertical.eyebrow}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
