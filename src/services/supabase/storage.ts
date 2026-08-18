import { createClient } from "@/services/supabase/server";

export type StorageBucket = "products" | "projects" | "banners" | "site";

function slugifyFilename(filename: string) {
  const [name, ...rest] = filename.split(".");
  const ext = rest.length ? rest[rest.length - 1] : "bin";
  const safeName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${safeName || "arquivo"}-${Date.now()}.${ext}`;
}

export async function uploadImage(bucket: StorageBucket, file: File): Promise<string> {
  const supabase = await createClient();
  const path = slugifyFilename(file.name);

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
