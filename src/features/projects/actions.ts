"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";
import { uploadImage } from "@/services/supabase/storage";

export type ActionState = { error?: string };

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function parseProject(
  formData: FormData,
  existingImageUrl: string | null,
  existingArchitectureImageUrl: string | null,
) {
  const categoryId = String(formData.get("category_id") ?? "");
  const imageFile = formData.get("image") as File | null;
  const architectureImageFile = formData.get("architecture_image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0 ? await uploadImage("projects", imageFile) : existingImageUrl;
  const architectureImageUrl =
    architectureImageFile && architectureImageFile.size > 0
      ? await uploadImage("projects", architectureImageFile)
      : existingArchitectureImageUrl;

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    challenge: String(formData.get("challenge") ?? "").trim() || null,
    solution: String(formData.get("solution") ?? "").trim() || null,
    development: String(formData.get("development") ?? "").trim() || null,
    architecture_description:
      String(formData.get("architecture_description") ?? "").trim() || null,
    capabilities: parseList(formData.get("capabilities")),
    benefits: parseList(formData.get("benefits")),
    technologies: parseList(formData.get("technologies")),
    cta_title: String(formData.get("cta_title") ?? "").trim() || null,
    cta_text: String(formData.get("cta_text") ?? "").trim() || null,
    cta_label: String(formData.get("cta_label") ?? "").trim() || null,
    cta_message: String(formData.get("cta_message") ?? "").trim() || null,
    image_url: imageUrl,
    architecture_image_url: architectureImageUrl,
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
    values = await parseProject(formData, null, null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar uma das imagens." };
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
  existingArchitectureImageUrl: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let values;
  try {
    values = await parseProject(formData, existingImageUrl, existingArchitectureImageUrl);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar uma das imagens." };
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
