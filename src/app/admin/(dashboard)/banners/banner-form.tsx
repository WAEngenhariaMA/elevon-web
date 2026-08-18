"use client";

import { useActionState } from "react";
import type { Banner } from "@/types";
import { TextField, ToggleField, ImageField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import type { ActionState } from "@/features/banners/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function BannerForm({ banner, action }: { banner?: Banner; action: Action }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <FormError message={state.error} />

      <TextField label="Título" name="title" required defaultValue={banner?.title} />
      <TextField label="Subtítulo" name="subtitle" defaultValue={banner?.subtitle ?? ""} />

      <ImageField label="Imagem" name="image" currentUrl={banner?.image_url} />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Texto do botão" name="cta_text" defaultValue={banner?.cta_text ?? ""} />
        <TextField label="URL do botão" name="cta_url" type="url" defaultValue={banner?.cta_url ?? ""} />
      </div>

      <ToggleField label="Banner ativo" name="active" defaultChecked={banner?.active ?? true} />

      <SubmitButton>{banner ? "Salvar alterações" : "Criar banner"}</SubmitButton>
    </form>
  );
}
