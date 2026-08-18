"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/components/analytics/events";

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  source: string;
};

export function WhatsAppLink({ href, source, onClick, ...rest }: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackEvent("click_whatsapp", { source });
        onClick?.(event);
      }}
      {...rest}
    />
  );
}
