"use client";

import { useActionState } from "react";
import type { Category, Product } from "@/types";
import { TextField, TextAreaField, SelectField, ToggleField, ImageField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import type { ActionState } from "@/features/products/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function ProductForm({
  product,
  categories,
  action,
}: {
  product?: Product;
  categories: Category[];
  action: Action;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <FormError message={state.error} />

      <TextField label="Nome" name="name" required defaultValue={product?.name} />
      <TextField
        label="Slug"
        name="slug"
        required
        defaultValue={product?.slug}
        hint="Identificador único usado na URL do produto."
      />
      <TextField
        label="Descrição curta"
        name="short_description"
        required
        defaultValue={product?.short_description}
      />
      <TextAreaField label="Descrição completa" name="description" defaultValue={product?.description ?? ""} />

      <ImageField label="Imagem" name="image" currentUrl={product?.image_url} />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Preço (R$)" name="price" type="number" step="0.01" min="0" defaultValue={product?.price ?? ""} />
        <TextField
          label="Preço anterior (R$)"
          name="old_price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product?.old_price ?? ""}
        />
      </div>

      <TextField
        label="URL de checkout"
        name="checkout_url"
        type="url"
        defaultValue={product?.checkout_url ?? ""}
        hint="Se vazio, o botão abre uma conversa no WhatsApp sobre o produto."
      />

      <SelectField label="Categoria" name="category_id" defaultValue={product?.category_id ?? ""}>
        <option value="">Sem categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectField>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToggleField label="Produto ativo" name="active" defaultChecked={product?.active ?? true} />
        <ToggleField label="Destaque" name="featured" defaultChecked={product?.featured ?? false} />
      </div>

      <SubmitButton>{product ? "Salvar alterações" : "Criar produto"}</SubmitButton>
    </form>
  );
}
