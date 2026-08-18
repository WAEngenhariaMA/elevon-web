import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#07101c] px-6 py-10 text-slate-400 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row">
        <div>
          <p className="text-lg font-bold tracking-[.18em] text-white">
            ELE<span className="text-[#D4AF37]">VON</span>
          </p>
          <p className="mt-2 text-sm">Evolução, tecnologia e resultados.</p>
        </div>

        <div className="flex gap-5 text-sm">
          <Link href="/links" className="focus-ring hover:text-white">
            Links
          </Link>
          <Link href="/produtos" className="focus-ring hover:text-white">
            Produtos
          </Link>
          <Link href="/admin" className="focus-ring hover:text-white">
            Administração
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs">
        © {new Date().getFullYear()} Elevon. Todos os direitos reservados.
      </div>
    </footer>
  );
}
