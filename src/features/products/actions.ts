"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insertRow, updateRow, deleteRow } from "@/services/supabase/mutations";
import { uploadImage } from "@/services/supabase/storage";

export type ActionState = { error?: string };

function toNullableNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

async function parseProduct(formData: FormData, existingImageUrl: string | null) {
  const categoryId = String(formData.get("category_id") ?? "");
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0 ? await uploadImage("products", imageFile) : existingImageUrl;

  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    short_description: String(formData.get("short_description") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: imageUrl,
    price: toNullableNumber(formData.get("price")),
    old_price: toNullableNumber(formData.get("old_price")),
    checkout_url: String(formData.get("checkout_url") ?? "").trim() || null,
    category_id: categoryId || null,
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  };
}

function revalidateProductPaths() {
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/links");
}

export async function createProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  let values;
  try {
    values = await parseProduct(formData, null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." };
  }

  if (!values.name || !values.slug || !values.short_description) {
    return { error: "Nome, slug e descrição curta são obrigatórios." };
  }

  try {
    await insertRow("products", values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível criar o produto." };
  }

  revalidateProductPaths();
  redirect("/admin/produtos?success=Produto criado com sucesso.");
}

export async function updateProduct(
  id: string,
  existingImageUrl: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let values;
  try {
    values = await parseProduct(formData, existingImageUrl);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." };
  }

  if (!values.name || !values.slug || !values.short_description) {
    return { error: "Nome, slug e descrição curta são obrigatórios." };
  }

  try {
    await updateRow("products", id, values);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar o produto." };
  }

  revalidateProductPaths();
  redirect("/admin/produtos?success=Produto atualizado com sucesso.");
}

export async function deleteProduct(id: string) {
  "use server";
  await deleteRow("products", id);
  revalidateProductPaths();
}
