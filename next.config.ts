import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default function config(phase: string): NextConfig {
  // Platform bindings are needed by next dev, never by next build/typegen.
  // Local UI verification can skip workerd on hosts without a supported runtime.
  if (
    phase === PHASE_DEVELOPMENT_SERVER &&
    process.env.CLOUDFLARE_DEV_CONTEXT !== "off"
  ) {
    void initOpenNextCloudflareForDev();
  }
  return nextConfig;
}
