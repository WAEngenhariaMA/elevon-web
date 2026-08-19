"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Início", "/"],
  ["Soluções", "/#solucoes"],
  ["Digital", "/digital"],
  ["Engenharia", "/engenharia"],
  ["AI", "/ai"],
  ["Academy", "/academy"],
  ["Labs", "/labs"],
  ["Produtos", "/produtos"],
  ["Sobre", "/#ecossistema"],
  ["Contato", "/#contato"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/" className="focus-ring text-2xl font-extrabold tracking-[.18em] text-[#0B1320]">
          ELE<span className="text-[#D4AF37]">VON</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {nav.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className="focus-ring text-xs font-medium text-slate-600 hover:text-[#0B1320]"
            >
              {name}
            </Link>
          ))}
        </nav>

        <Link
          href="/#solucoes"
          className="focus-ring hidden rounded-full bg-[#D4AF37] px-4 py-2.5 text-xs font-bold text-[#0B1320] sm:block"
        >
          Conheça nossas soluções
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Alternar menu"
          aria-expanded={open}
          className="focus-ring xl:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-6 py-5 xl:hidden">
          {nav.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium"
            >
              {name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
