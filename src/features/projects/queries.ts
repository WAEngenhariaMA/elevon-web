import { createClient } from "@/services/supabase/server";
import type { Project } from "@/types";

const SELECT_WITH_CATEGORY = "*, category:categories(*)";

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_WITH_CATEGORY)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as unknown as Project[];
}

export async function getActiveProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select(SELECT_WITH_CATEGORY)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as unknown as Project[];
  } catch {
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_WITH_CATEGORY)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as Project | null;
}
