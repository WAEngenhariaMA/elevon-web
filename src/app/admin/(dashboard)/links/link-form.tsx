"use client";

import { useActionState } from "react";
import type { Category, ElevonLink } from "@/types";
import { TextField, SelectField, ToggleField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import type { ActionState } from "@/features/links/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function LinkForm({
  link,
  categories,
  action,
}: {
  link?: ElevonLink;
  categories: Category[];
  action: Action;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <FormError message={state.error} />

      <TextField label="Título" name="title" required defaultValue={link?.title} />
      <TextField label="Subtítulo" name="subtitle" defaultValue={link?.subtitle ?? ""} />
      <TextField label="URL" name="url" type="url" required defaultValue={link?.url} placeholder="https://" />
      <TextField
        label="Ícone"
        name="icon"
        defaultValue={link?.icon ?? ""}
        hint="Nome de um ícone da biblioteca lucide-react (ex.: MessageCircle)."
      />

      <SelectField label="Categoria" name="category_id" defaultValue={link?.category_id ?? ""}>
        <option value="">Sem categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectField>

      <TextField
        label="Ordem"
        name="sort_order"
        type="number"
        defaultValue={link?.sort_order ?? 0}
        hint="Links com menor número aparecem primeiro."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <ToggleField label="Link ativo" name="active" defaultChecked={link?.active ?? true} />
        <ToggleField label="Destaque" name="featured" defaultChecked={link?.featured ?? false} />
      </div>

      <SubmitButton>{link ? "Salvar alterações" : "Criar link"}</SubmitButton>
    </form>
  );
}
