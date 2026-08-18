"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";

export type ActionState = { error?: string };

function parseCategory(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    active: formData.get("active") === "on",
  };
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/categorias");
  revalidatePath("/links");
  revalidatePath("/produtos");
}

export async function createCategory(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = parseCategory(formData);
  if (!values.name || !values.slug) return { error: "Nome e slug são obrigatórios." };

  try {
    await insertRow("categories", values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar a categoria." };
  }

  revalidateCategoryPaths();
  redirect("/admin/categorias?success=Categoria criada com sucesso.");
}

export async function updateCategory(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = parseCategory(formData);
  if (!values.name || !values.slug) return { error: "Nome e slug são obrigatórios." };

  try {
    await updateRow("categories", id, values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar a categoria." };
  }

  revalidateCategoryPaths();
  redirect("/admin/categorias?success=Categoria atualizada com sucesso.");
}

export async function deleteCategory(id: string) {
  "use server";
  await deleteRow("categories", id);
  revalidateCategoryPaths();
}
