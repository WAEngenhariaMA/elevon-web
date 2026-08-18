import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/cards/product-card";
import { getProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Produtos, sistemas e soluções criadas pela Elevon.",
  alternates: { canonical: "/produtos" },
};

export default async function Produtos() {
  const products = await getProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.short_description,
        image: product.image_url ?? undefined,
        offers: product.price
          ? {
              "@type": "Offer",
              priceCurrency: "BRL",
              price: product.price,
              url: product.checkout_url ?? "https://elevon.digital.br/produtos",
            }
          : undefined,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section className="bg-[#0B1320] px-6 py-24 text-white sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold tracking-[.22em] text-[#D4AF37]">ELEVON PRODUCTS</p>
            <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">
              Produtos para acelerar a evolução.
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              Soluções digitais desenhadas para transformar intenção em execução.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div id={product.slug} key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="mx-auto max-w-md text-center text-sm text-slate-500">
              Nenhum produto publicado no momento. Volte em breve.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
