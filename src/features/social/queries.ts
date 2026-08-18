import { createClient } from "@/services/supabase/server";
import type { SocialLink } from "@/types";

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("social_links").select("*").order("platform");
  if (error) throw new Error(error.message);
  return data as SocialLink[];
}

export async function getActiveSocialLinks(): Promise<SocialLink[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("active", true)
      .order("platform");
    if (error) throw error;
    return data as SocialLink[];
  } catch {
    return [];
  }
}

export async function getSocialLinkById(id: string): Promise<SocialLink | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("social_links").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
