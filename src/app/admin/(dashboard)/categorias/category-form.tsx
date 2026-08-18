"use client";

import { useActionState } from "react";
import type { Category } from "@/types";
import { TextField, TextAreaField, ToggleField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import type { ActionState } from "@/features/categories/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function CategoryForm({ category, action }: { category?: Category; action: Action }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <FormError message={state.error} />

      <TextField label="Nome" name="name" required defaultValue={category?.name} />
      <TextField
        label="Slug"
        name="slug"
        required
        defaultValue={category?.slug}
        hint="Identificador único usado na URL (ex.: engenharia)."
      />
      <TextAreaField label="Descrição" name="description" defaultValue={category?.description ?? ""} />
      <ToggleField label="Categoria ativa" name="active" defaultChecked={category?.active ?? true} />

      <SubmitButton>{category ? "Salvar alterações" : "Criar categoria"}</SubmitButton>
    </form>
  );
}
