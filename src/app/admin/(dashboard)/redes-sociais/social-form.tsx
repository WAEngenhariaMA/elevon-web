"use client";

import { useActionState } from "react";
import type { SocialLink } from "@/types";
import { SelectField, TextField, ToggleField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import type { ActionState } from "@/features/social/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const platforms = ["instagram", "linkedin", "youtube", "tiktok", "facebook", "x", "whatsapp"];

export function SocialForm({ social, action }: { social?: SocialLink; action: Action }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <FormError message={state.error} />

      <SelectField label="Plataforma" name="platform" required defaultValue={social?.platform ?? ""}>
        <option value="" disabled>
          Selecione
        </option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </SelectField>

      <TextField label="URL" name="url" type="url" required defaultValue={social?.url} placeholder="https://" />
      <ToggleField label="Rede social ativa" name="active" defaultChecked={social?.active ?? true} />

      <SubmitButton>{social ? "Salvar alterações" : "Criar rede social"}</SubmitButton>
    </form>
  );
}
