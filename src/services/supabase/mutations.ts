import { createClient } from "@/services/supabase/server";

export async function insertRow(table: string, values: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(values);
  if (error) throw new Error(error.message);
}

export async function updateRow(table: string, id: string, values: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).update(values).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteRow(table: string, id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
