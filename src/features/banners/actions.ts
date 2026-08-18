"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";
import { uploadImage } from "@/services/supabase/storage";

export type ActionState = { error?: string };

async function parseBanner(formData: FormData, existingImageUrl: string | null) {
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0 ? await uploadImage("banners", imageFile) : existingImageUrl;

  return {
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    image_url: imageUrl,
    cta_text: String(formData.get("cta_text") ?? "").trim() || null,
    cta_url: String(formData.get("cta_url") ?? "").trim() || null,
    active: formData.get("active") === "on",
  };
}

function revalidateBannerPaths() {
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function createBanner(_prev: ActionState, formData: FormData): Promise<ActionState> {
  let values;
  try {
    values = await parseBanner(formData, null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." };
  }

  if (!values.title) return { error: "O título é obrigatório." };

  try {
    await insertRow("banners", values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar o banner." };
  }

  revalidateBannerPaths();
  redirect("/admin/banners?success=Banner criado com sucesso.");
}

export async function updateBanner(
  id: string,
  existingImageUrl: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let values;
  try {
    values = await parseBanner(formData, existingImageUrl);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." };
  }

  if (!values.title) return { error: "O título é obrigatório." };

  try {
    await updateRow("banners", id, values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar o banner." };
  }

  revalidateBannerPaths();
  redirect("/admin/banners?success=Banner atualizado com sucesso.");
}

export async function deleteBanner(id: string) {
  "use server";
  await deleteRow("banners", id);
  revalidateBannerPaths();
}
