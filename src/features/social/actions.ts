"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";

export type ActionState = { error?: string };

function parseSocialLink(formData: FormData) {
  return {
    platform: String(formData.get("platform") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
    active: formData.get("active") === "on",
  };
}

function revalidateSocialPaths() {
  revalidatePath("/admin/redes-sociais");
  revalidatePath("/links");
}

export async function createSocialLink(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = parseSocialLink(formData);
  if (!values.platform || !values.url) return { error: "Plataforma e URL são obrigatórias." };

  try {
    await insertRow("social_links", values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar a rede social." };
  }

  revalidateSocialPaths();
  redirect("/admin/redes-sociais?success=Rede social criada com sucesso.");
}

export async function updateSocialLink(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = parseSocialLink(formData);
  if (!values.platform || !values.url) return { error: "Plataforma e URL são obrigatórias." };

  try {
    await updateRow("social_links", id, values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar a rede social." };
  }

  revalidateSocialPaths();
  redirect("/admin/redes-sociais?success=Rede social atualizada com sucesso.");
}

export async function deleteSocialLink(id: string) {
  "use server";
  await deleteRow("social_links", id);
  revalidateSocialPaths();
}
