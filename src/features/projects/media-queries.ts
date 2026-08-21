import { createClient } from "@/services/supabase/server";

export interface ProjectMedia {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getProjectMedia(projectId: string): Promise<ProjectMedia[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as ProjectMedia[];
}

export async function getActiveProjectMedia(projectId: string): Promise<ProjectMedia[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", projectId)
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as ProjectMedia[];
}
