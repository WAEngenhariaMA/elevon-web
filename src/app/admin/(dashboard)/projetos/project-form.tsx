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
      className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <FormError message={state.error} />

      <section className="space-y-5">
        <h2 className="text-lg font-semibold">Informações básicas</h2>
        <TextField label="Título" name="title" required defaultValue={project?.title} />
        <TextField label="Slug" name="slug" required defaultValue={project?.slug} />
        <TextAreaField label="Descrição" name="description" defaultValue={project?.description ?? ""} />
      </section>

      <section className="space-y-5 border-t border-slate-100 pt-6">
        <h2 className="text-lg font-semibold">Conteúdo da página do projeto</h2>
        <TextField label="Subtítulo" name="subtitle" defaultValue={project?.subtitle ?? ""} />
        <TextAreaField label="O desafio" name="challenge" defaultValue={project?.challenge ?? ""} />
        <TextAreaField label="A solução" name="solution" defaultValue={project?.solution ?? ""} />
        <TextAreaField
          label="Como foi desenvolvido"
          name="development"
          defaultValue={project?.development ?? ""}
        />
        <TextAreaField
          label="Arquitetura da solução"
          name="architecture_description"
          defaultValue={project?.architecture_description ?? ""}
        />
        <ImageField
          label="Imagem da arquitetura"
          name="architecture_image"
          currentUrl={project?.architecture_image_url}
        />
      </section>

      <section className="space-y-5 border-t border-slate-100 pt-6">
        <div>
          <h2 className="text-lg font-semibold">Capacidades, benefícios e tecnologias</h2>
          <p className="mt-1 text-sm text-slate-500">Informe um item por linha.</p>
        </div>
        <TextAreaField
          label="Capacidades / funcionalidades"
          name="capabilities"
          defaultValue={project?.capabilities?.join("\n") ?? ""}
        />
        <TextAreaField label="Benefícios" name="benefits" defaultValue={project?.benefits?.join("\n") ?? ""} />
        <TextAreaField
          label="Tecnologias utilizadas"
          name="technologies"
          defaultValue={project?.technologies?.join("\n") ?? ""}
        />
      </section>

      <section className="space-y-5 border-t border-slate-100 pt-6">
        <h2 className="text-lg font-semibold">Conversão</h2>
        <TextField label="Título do CTA" name="cta_title" defaultValue={project?.cta_title ?? ""} />
        <TextAreaField label="Texto do CTA" name="cta_text" defaultValue={project?.cta_text ?? ""} />
        <TextField label="Texto do botão" name="cta_label" defaultValue={project?.cta_label ?? ""} />
        <TextAreaField
          label="Mensagem de contato"
          name="cta_message"
          defaultValue={project?.cta_message ?? ""}
        />
      </section>

      <section className="space-y-5 border-t border-slate-100 pt-6">
        <h2 className="text-lg font-semibold">Publicação</h2>
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
      </section>

      <SubmitButton>{project ? "Salvar alterações" : "Criar projeto"}</SubmitButton>
    </form>
  );
}
