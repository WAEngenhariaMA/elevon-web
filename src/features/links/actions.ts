"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";

export type ActionState = { error?: string };

function parseLink(formData: FormData) {
  const categoryId = String(formData.get("category_id") ?? "");
  return {
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    url: String(formData.get("url") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim() || null,
    category_id: categoryId || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
    active: formData.get("active") === "on",
    featured: formData.get("featured") === "on",
  };
}

function revalidateLinkPaths() {
  revalidatePath("/admin/links");
  revalidatePath("/links");
}

export async function createLink(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = parseLink(formData);
  if (!values.title || !values.url) return { error: "Título e URL são obrigatórios." };

  try {
    await insertRow("links", values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar o link." };
  }

  revalidateLinkPaths();
  redirect("/admin/links?success=Link criado com sucesso.");
}

export async function updateLink(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = parseLink(formData);
  if (!values.title || !values.url) return { error: "Título e URL são obrigatórios." };

  try {
    await updateRow("links", id, values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar o link." };
  }

  revalidateLinkPaths();
  redirect("/admin/links?success=Link atualizado com sucesso.");
}

export async function deleteLink(id: string) {
  "use server";
  await deleteRow("links", id);
  revalidateLinkPaths();
}

export async function toggleLinkActive(id: string, active: boolean) {
  "use server";
  await updateRow("links", id, { active });
  revalidateLinkPaths();
}
