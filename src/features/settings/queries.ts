import { createClient } from "@/services/supabase/server";
import type { SiteSetting } from "@/types";

export async function getAllSettings(): Promise<SiteSetting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").order("key");
  if (error) throw new Error(error.message);
  return data as SiteSetting[];
}

export async function getSettingById(id: string): Promise<SiteSetting | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
