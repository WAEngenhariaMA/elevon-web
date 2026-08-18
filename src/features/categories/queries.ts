import { createClient } from "@/services/supabase/server";
import type { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw new Error(error.message);
  return data as Category[];
}

export async function getActiveCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("name");
    if (error) throw error;
    return data as Category[];
  } catch {
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
