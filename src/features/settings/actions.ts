"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";

export type ActionState = { error?: string };

function parseSettingValue(raw: string): unknown {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

function revalidateSettingsPaths() {
  revalidatePath("/admin/configuracoes");
  revalidatePath("/");
}

export async function createSetting(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const key = String(formData.get("key") ?? "").trim();
  const value = parseSettingValue(String(formData.get("value") ?? ""));
  if (!key) return { error: "A chave é obrigatória." };

  try {
    await insertRow("site_settings", { key, value });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar a configuração." };
  }

  revalidateSettingsPaths();
  redirect("/admin/configuracoes?success=Configuração criada com sucesso.");
}

export async function updateSetting(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const value = parseSettingValue(String(formData.get("value") ?? ""));

  try {
    await updateRow("site_settings", id, { value });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar a configuração." };
  }

  revalidateSettingsPaths();
  redirect("/admin/configuracoes?success=Configuração atualizada com sucesso.");
}

export async function deleteSetting(id: string) {
  "use server";
  await deleteRow("site_settings", id);
  revalidateSettingsPaths();
}
