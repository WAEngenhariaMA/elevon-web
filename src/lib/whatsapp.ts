import { DEFAULT_WHATSAPP_MESSAGE, verticals } from "@/config/brand";

function sanitizeNumber(number: string) {
  return number.replace(/\D/g, "");
}

export function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  const number = sanitizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function whatsAppUrlForVertical(slug: string) {
  const vertical = verticals.find((item) => item.slug === slug);
  return buildWhatsAppUrl(vertical?.whatsappMessage ?? DEFAULT_WHATSAPP_MESSAGE);
}

export function whatsAppUrlForProduct(productName: string) {
  return buildWhatsAppUrl(`Olá, tenho interesse no produto "${productName}" da Elevon.`);
}
