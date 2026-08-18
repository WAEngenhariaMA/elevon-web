"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types";
import { formatBRL } from "@/lib/utils";
import { whatsAppUrlForProduct } from "@/lib/whatsapp";
import { trackEvent } from "@/components/analytics/events";

export function ProductCard({ product }: { product: Product }) {
  const checkoutHref = product.checkout_url ?? whatsAppUrlForProduct(product.name);

  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      onMouseEnter={() => trackEvent("view_product", { product: product.slug })}
    >
      <div className="relative flex aspect-[16/9] items-end bg-gradient-to-br from-[#132844] to-[#2563EB] p-5">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        )}
        <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
          {product.category?.name ?? "Demonstração"}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
          {product.short_description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            {product.old_price && (
              <p className="text-xs text-slate-400 line-through">{formatBRL(product.old_price)}</p>
            )}
            <p className="font-bold text-[#0B1320]">{formatBRL(product.price)}</p>
          </div>

          <a
            href={checkoutHref}
            target={product.checkout_url ? undefined : "_blank"}
            rel={product.checkout_url ? undefined : "noopener noreferrer"}
            onClick={() =>
              trackEvent("click_checkout", { product: product.slug, price: product.price ?? 0 })
            }
            className="focus-ring inline-flex items-center gap-1 text-sm font-bold text-[#2563EB]"
          >
            Conhecer <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
