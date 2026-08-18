import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getActiveLinks } from "@/features/links/queries";
import { getActiveCategories } from "@/features/categories/queries";
import { getActiveSocialLinks } from "@/features/social/queries";
import { getProducts } from "@/features/products/queries";
import { resolveIcon, resolveSocialIcon } from "@/lib/icons";
import { formatBRL } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import type { Category, ElevonLink } from "@/types";

export const metadata: Metadata = {
  title: "Links",
  description: "Todos os links, produtos e redes sociais da Elevon em um só lugar.",
  alternates: { canonical: "/links" },
};

function groupLinksByCategory(links: ElevonLink[], categories: Category[]) {
  const groups = new Map<string, { category: Category | null; links: ElevonLink[] }>();

  for (const category of categories) {
    groups.set(category.id, { category, links: [] });
  }
  groups.set("sem-categoria", { category: null, links: [] });

  for (const link of links) {
    const key = link.category_id && groups.has(link.category_id) ? link.category_id : "sem-categoria";
    groups.get(key)!.links.push(link);
  }

  return Array.from(groups.values()).filter((group) => group.links.length > 0);
}

export default async function LinksPage() {
  const [links, categories, socialLinks, products] = await Promise.all([
    getActiveLinks(),
    getActiveCategories(),
    getActiveSocialLinks(),
    getProducts(),
  ]);

  const featuredLinks = links.filter((link) => link.featured);
  const groupedLinks = groupLinksByCategory(links, categories);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

  return (
    <main className="grid-glow min-h-screen bg-[#0B1320] px-5 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <Link
            href="/"
            className="focus-ring inline-block rounded-full border border-[#D4AF37]/50 px-5 py-3 text-2xl font-bold tracking-[.18em]"
          >
            ELE<span className="text-[#D4AF37]">VON</span>
          </Link>
          <p className="mt-6 text-xs font-bold tracking-[.18em] text-[#D4AF37]">
            EVOLUÇÃO • TECNOLOGIA • RESULTADOS
          </p>
          <h1 className="mt-3 text-2xl font-semibold">Um ecossistema para construir o futuro.</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-300">
            Engenharia, dados, IA e produtos digitais conectados em soluções reais.
          </p>
        </div>

        {featuredLinks.length > 0 && (
          <section className="mt-9 space-y-3">
            {featuredLinks.map((link) => {
              const Icon = resolveIcon(link.icon);
              return (
                <TrackedLink
                  key={link.id}
                  href={link.url}
                  linkId={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex items-center gap-4 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/15"
                >
                  <span className="rounded-xl bg-[#D4AF37] p-3 text-[#0B1320]">
                    <Icon size={19} />
                  </span>
                  <span className="flex-1">
                    <b className="block text-sm">{link.title}</b>
                    {link.subtitle && <small className="mt-1 block text-xs text-slate-300">{link.subtitle}</small>}
                  </span>
                  <ArrowRight size={17} className="text-[#D4AF37]" />
                </TrackedLink>
              );
            })}
          </section>
        )}

        {groupedLinks.map(({ category, links: groupLinks }) => (
          <section key={category?.id ?? "sem-categoria"} className="mt-9">
            <p className="mb-3 text-xs font-bold tracking-[.18em] text-slate-400">
              {(category?.name ?? "Outros links").toUpperCase()}
            </p>
            <div className="space-y-3">
              {groupLinks.map((link) => {
                const Icon = resolveIcon(link.icon);
                return (
                  <TrackedLink
                    key={link.id}
                    href={link.url}
                    linkId={link.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex items-center gap-4 rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:border-[#D4AF37]/70 hover:bg-white/12"
                  >
                    <span className="rounded-xl bg-white/10 p-3 text-white">
                      <Icon size={19} />
                    </span>
                    <span className="flex-1">
                      <b className="block text-sm">{link.title}</b>
                      {link.subtitle && (
                        <small className="mt-1 block text-xs text-slate-300">{link.subtitle}</small>
                      )}
                    </span>
                    <ArrowRight size={17} className="text-slate-400" />
                  </TrackedLink>
                );
              })}
            </div>
          </section>
        ))}

        {links.length === 0 && (
          <p className="mt-9 rounded-2xl border border-dashed border-white/20 p-6 text-center text-sm text-slate-400">
            Nenhum link publicado no momento. Volte em breve.
          </p>
        )}

        {featuredProducts.length > 0 && (
          <section className="mt-9">
            <p className="mb-3 text-xs font-bold tracking-[.18em] text-slate-400">PRODUTOS EM DESTAQUE</p>
            <div className="space-y-3">
              {featuredProducts.map((product) => (
                <TrackedLink
                  key={product.id}
                  href={`/produtos#${product.slug}`}
                  linkId={`product_${product.slug}`}
                  className="focus-ring flex items-center gap-4 rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:border-[#2563EB]/70 hover:bg-white/12"
                >
                  <span className="flex-1">
                    <b className="block text-sm">{product.name}</b>
                    <small className="mt-1 block text-xs text-slate-300">{formatBRL(product.price)}</small>
                  </span>
                  <ArrowRight size={17} className="text-slate-400" />
                </TrackedLink>
              ))}
            </div>
            <Link
              href="/produtos"
              className="focus-ring mt-3 block text-center text-xs font-semibold text-[#2563EB]"
            >
              Ver todos os produtos →
            </Link>
          </section>
        )}

        <WhatsAppLink
          href={buildWhatsAppUrl()}
          source="links_bio"
          className="focus-ring mt-9 flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] p-4 text-sm font-bold text-[#0B1320]"
        >
          <MessageCircle size={19} /> Fale pelo WhatsApp
        </WhatsAppLink>

        {socialLinks.length > 0 && (
          <div className="mt-8 flex justify-center gap-5 text-slate-300">
            {socialLinks.map((social) => {
              const Icon = resolveSocialIcon(social.platform);
              return (
                <TrackedLink
                  key={social.id}
                  href={social.url}
                  linkId={`social_${social.platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="focus-ring hover:text-[#D4AF37]"
                >
                  <Icon size={20} />
                </TrackedLink>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Elevon. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
