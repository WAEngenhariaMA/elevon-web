import { createClient } from "@/services/supabase/server";
import type { ElevonLink } from "@/types";

const SELECT_WITH_CATEGORY = "*, category:categories(*)";

export async function getAllLinks(): Promise<ElevonLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("links")
    .select(SELECT_WITH_CATEGORY)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data as unknown as ElevonLink[];
}

export async function getActiveLinks(): Promise<ElevonLink[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("links")
      .select(SELECT_WITH_CATEGORY)
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data as unknown as ElevonLink[];
  } catch {
    return [];
  }
}

export async function getLinkById(id: string): Promise<ElevonLink | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("links")
    .select(SELECT_WITH_CATEGORY)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as ElevonLink | null;
}
