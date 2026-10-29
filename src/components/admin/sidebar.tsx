"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Boxes,
  FolderKanban,
  Image as ImageIcon,
  Link2,
  LogOut,
  Menu,
  Settings,
  Share2,
  Tag,
  X,
} from "lucide-react";
import { logout } from "@/features/auth/actions";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/iq-elevon", label: "IQ Elevon", icon: Activity },
  { href: "/admin/links", label: "Links", icon: Link2 },
  { href: "/admin/produtos", label: "Produtos", icon: Boxes },
  { href: "/admin/categorias", label: "Categorias", icon: Tag },
  { href: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/redes-sociais", label: "Redes sociais", icon: Share2 },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="mt-8 space-y-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={`focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active ? "bg-[#0B1320] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1320]"
            }`}
          >
            <Icon size={17} /> {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div>
        <Link href="/admin" className="block px-2 text-lg font-bold tracking-[.15em] text-[#0B1320]">
          ELE<span className="text-[#D4AF37]">VON</span>
        </Link>
        <p className="px-2 pt-1 text-xs font-semibold tracking-[.2em] text-slate-400">ADMIN</p>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="space-y-2">
        <Link href="/" className="focus-ring block px-2 text-xs font-medium text-[#2563EB]">
          Ver site →
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={17} /> Sair
          </button>
        </form>
      </div>
    </div>
  );
}

export function Sidebar(): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:hidden">
        <Link href="/admin" className="text-lg font-bold tracking-[.15em] text-[#0B1320]">
          ELE<span className="text-[#D4AF37]">VON</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Abrir menu" className="focus-ring">
          <Menu />
        </button>
      </header>

      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl">
            <div className="flex justify-end p-4">
              <button onClick={() => setOpen(false)} aria-label="Fechar menu" className="focus-ring">
                <X />
              </button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
