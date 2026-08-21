import Link from "next/link";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 items-center overflow-hidden bg-[#0B1320] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[.24em] text-[#D4AF37]">ERRO 404</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Esta página saiu da rota.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">O endereço que você tentou acessar não existe, foi alterado ou não está disponível no momento.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#0B1320]"><ArrowLeft size={17} /> Voltar para o início</Link>
              <Link href="/#solucoes" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold hover:border-[#2563EB]"><ArrowRight size={17} /> Conhecer soluções</Link>
            </div>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[2rem] border border-white/10 bg-white/5">
            <SearchX className="absolute top-10 text-[#D4AF37]" size={40} />
            <span className="text-8xl font-semibold tracking-tighter text-white/10 sm:text-9xl">404</span>
            <span className="absolute bottom-10 h-px w-24 bg-[#2563EB]" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
