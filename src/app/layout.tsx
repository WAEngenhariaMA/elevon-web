import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { UtmCapture } from "@/components/analytics/utm-capture";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  metadataBase: new URL("https://elevon.digital.br"),
  title: { default: "Elevon | Evolução, tecnologia e resultados", template: "%s | Elevon" },
  description: "A Elevon conecta engenharia, inteligência artificial, dados, tecnologia e produtos digitais.",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Elevon" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body>
        <UtmCapture />
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
