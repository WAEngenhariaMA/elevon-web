"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";
import { uploadImage } from "@/services/supabase/storage";

export type ActionState = { error?: string };

async function parseProject(formData: FormData, existingImageUrl: string | null) {
  const categoryId = String(formData.get("category_id") ?? "");
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0 ? await uploadImage("projects", imageFile) : existingImageUrl;

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: imageUrl,
    status: String(formData.get("status") ?? "draft"),
    category_id: categoryId || null,
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  };
}

function revalidateProjectPaths() {
  revalidatePath("/admin/projetos");
}

export async function createProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  let values;
  try {
    values = await parseProject(formData, null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." };
  }

  if (!values.title || !values.slug) return { error: "Título e slug são obrigatórios." };

  try {
    await insertRow("projects", values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar o projeto." };
  }

  revalidateProjectPaths();
  redirect("/admin/projetos?success=Projeto criado com sucesso.");
}

export async function updateProject(
  id: string,
  existingImageUrl: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let values;
  try {
    values = await parseProject(formData, existingImageUrl);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." };
  }

  if (!values.title || !values.slug) return { error: "Título e slug são obrigatórios." };

  try {
    await updateRow("projects", id, values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar o projeto." };
  }

  revalidateProjectPaths();
  redirect("/admin/projetos?success=Projeto atualizado com sucesso.");
}

export async function deleteProject(id: string) {
  "use server";
  await deleteRow("projects", id);
  revalidateProjectPaths();
}
