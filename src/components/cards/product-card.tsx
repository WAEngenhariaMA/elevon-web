"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types";
import { formatBRL } from "@/lib/utils";
import { whatsAppUrlForProduct } from "@/lib/whatsapp";
import { trackEvent } from "@/components/analytics/events";

export function ProductCard({ product }: { product: Product }) {
  const checkoutHref = product.checkout_url ?? whatsAppUrlForProduct(product.name);
  const categoryVisuals: Record<string, { accent: string; gradient: string }> = {
    "Elevon Digital": {
      accent: "#8B5CF6",
      gradient: "linear-gradient(135deg, #132844 0%, #382366 100%)",
    },
    "Elevon Engenharia": {
      accent: "#2563EB",
      gradient: "linear-gradient(135deg, #132844 0%, #1E3A8A 100%)",
    },
    "Elevon AI": {
      accent: "#14B8A6",
      gradient: "linear-gradient(135deg, #132844 0%, #115E59 100%)",
    },
    "Elevon Academy": {
      accent: "#D4AF37",
      gradient: "linear-gradient(135deg, #132844 0%, #6B4F0B 100%)",
    },
    "Elevon Labs": {
      accent: "#F97316",
      gradient: "linear-gradient(135deg, #132844 0%, #7C2D12 100%)",
    },
  };
  const visual = categoryVisuals[product.category?.name ?? ""] ?? {
    accent: "#2563EB",
    gradient: "linear-gradient(135deg, #132844 0%, #1E3A8A 100%)",
  };

  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      onMouseEnter={() => trackEvent("view_product", { product: product.slug })}
    >
      <div className="relative flex aspect-[4/3] items-end p-5" style={{ background: visual.gradient }}>
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain p-3"
          />
        )}
        <span
          className="relative z-10 rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: `${visual.accent}33`, border: `1px solid ${visual.accent}80` }}
        >
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
            className="focus-ring inline-flex items-center gap-1 text-sm font-bold"
            style={{ color: visual.accent }}
          >
            Conhecer <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
