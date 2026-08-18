"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/components/analytics/events";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  linkId: string;
};

export function TrackedLink({ href, linkId, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackEvent("click_link", { link: linkId });
        onClick?.(event);
      }}
      {...rest}
    />
  );
}
