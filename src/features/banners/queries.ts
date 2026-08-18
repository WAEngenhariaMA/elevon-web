import { createClient } from "@/services/supabase/server";
import type { Banner } from "@/types";

export async function getAllBanners(): Promise<Banner[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("banners").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Banner[];
}

export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Banner[];
  } catch {
    return [];
  }
}

export async function getBannerById(id: string): Promise<Banner | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("banners").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
