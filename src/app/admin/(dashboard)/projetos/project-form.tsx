"use client";

import { useActionState } from "react";
import type { Category, Project } from "@/types";
import { TextField, TextAreaField, SelectField, ToggleField, ImageField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import type { ActionState } from "@/features/projects/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function ProjectForm({
  project,
  categories,
  action,
}: {
  project?: Project;
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

      <TextField label="Título" name="title" required defaultValue={project?.title} />
      <TextField label="Slug" name="slug" required defaultValue={project?.slug} />
      <TextAreaField label="Descrição" name="description" defaultValue={project?.description ?? ""} />

      <ImageField label="Imagem" name="image" currentUrl={project?.image_url} />

      <SelectField label="Status" name="status" defaultValue={project?.status ?? "draft"}>
        <option value="draft">Rascunho</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluido">Concluído</option>
      </SelectField>

      <SelectField label="Categoria" name="category_id" defaultValue={project?.category_id ?? ""}>
        <option value="">Sem categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectField>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToggleField label="Projeto ativo" name="active" defaultChecked={project?.active ?? true} />
        <ToggleField label="Destaque" name="featured" defaultChecked={project?.featured ?? false} />
      </div>

      <SubmitButton>{project ? "Salvar alterações" : "Criar projeto"}</SubmitButton>
    </form>
  );
}
