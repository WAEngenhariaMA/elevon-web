import type { MetadataRoute } from "next";

const pages = ["", "/digital", "/engenharia", "/ai", "/academy", "/labs", "/produtos", "/links"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((url) => ({
    url: `https://elevon.digital.br${url}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: url === "" ? 1 : 0.8,
  }));
}
