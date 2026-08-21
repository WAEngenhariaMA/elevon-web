"use server";

import { revalidatePath } from "next/cache";
import { deleteRow, insertRow, updateRow } from "@/services/supabase/mutations";
import { uploadImage } from "@/services/supabase/storage";

export type MediaActionState = { error?: string; success?: string };

export async function createProjectMedia(
  projectId: string,
  _prev: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const imageFile = formData.get("image") as File | null;
  if (!imageFile || imageFile.size === 0) {
    return { error: "Selecione uma imagem para adicionar à galeria." };
  }

  try {
    const imageUrl = await uploadImage("projects", imageFile);
    const sortOrder = Number(formData.get("sort_order") ?? 0);

    await insertRow("project_media", {
      project_id: projectId,
      image_url: imageUrl,
      alt_text: String(formData.get("alt_text") ?? "").trim() || null,
      caption: String(formData.get("caption") ?? "").trim() || null,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      active: formData.get("active") === "on",
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível adicionar a imagem." };
  }

  revalidatePath(`/admin/projetos/${projectId}`);
  return { success: "Imagem adicionada à galeria." };
}

export async function updateProjectMedia(
  projectId: string,
  mediaId: string,
  _prev: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  try {
    await updateRow("project_media", mediaId, {
      alt_text: String(formData.get("alt_text") ?? "").trim() || null,
      caption: String(formData.get("caption") ?? "").trim() || null,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      active: formData.get("active") === "on",
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Não foi possível salvar as alterações.",
    };
  }
  revalidatePath(`/admin/projetos/${projectId}`);
  return { success: "Alterações salvas." };
}

export async function deleteProjectMedia(projectId: string, mediaId: string): Promise<void> {
  await deleteRow("project_media", mediaId);
  revalidatePath(`/admin/projetos/${projectId}`);
}
