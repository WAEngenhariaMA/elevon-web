import Link from "next/link";
import { BarChart3, Boxes, FolderKanban, Image as ImageIcon, Link2, Share2, Tag } from "lucide-react";
import { createClient } from "@/services/supabase/server";

const resources = [
  { name: "Links", description: "Gerencie os links da bio", icon: Link2, route: "links", table: "links" },
  { name: "Produtos", description: "Catálogo e checkouts", icon: Boxes, route: "produtos", table: "products" },
  { name: "Categorias", description: "Organização do ecossistema", icon: Tag, route: "categorias", table: "categories" },
  { name: "Projetos", description: "Cases e entregas", icon: FolderKanban, route: "projetos", table: "projects" },
  { name: "Banners", description: "Destaques da home", icon: ImageIcon, route: "banners", table: "banners" },
  { name: "Redes sociais", description: "Perfis oficiais da Elevon", icon: Share2, route: "redes-sociais", table: "social_links" },
] as const;

async function countActive(table: string) {
  try {
    const supabase = await createClient();
    const { count } = await supabase.from(table).select("*", { count: "exact", head: true }).eq("active", true);
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function AdminHome() {
  const counts = await Promise.all(resources.map((resource) => countActive(resource.table)));
  const totalActive = counts.reduce((sum, count) => sum + count, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[.15em] text-slate-400">PAINEL</p>
          <h1 className="mt-2 text-3xl font-semibold">Visão geral</h1>
        </div>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl bg-[#0B1320] p-6 text-white">
          <BarChart3 />
          <p className="mt-8 text-sm text-slate-300">Conteúdos ativos</p>
          <b className="mt-1 block text-3xl">{totalActive}</b>
        </article>

        {resources.map((resource, index) => (
          <Link
            key={resource.name}
            href={`/admin/${resource.route}`}
            className="focus-ring rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
          >
            <resource.icon className="text-[#2563EB]" />
            <h2 className="mt-8 font-bold">{resource.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
            <p className="mt-3 text-xs font-semibold text-slate-400">{counts[index]} ativos</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
