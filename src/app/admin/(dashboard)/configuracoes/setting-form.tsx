"use client";

import { useActionState } from "react";
import type { SiteSetting } from "@/types";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/feedback";
import { settingValueToText } from "@/lib/settings";
import type { ActionState } from "@/features/settings/actions";

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function SettingForm({ setting, action }: { setting?: SiteSetting; action: Action }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <FormError message={state.error} />

      <TextField
        label="Chave"
        name="key"
        required
        defaultValue={setting?.key}
        disabled={Boolean(setting)}
        hint={setting ? "A chave não pode ser alterada após criada." : "Identificador único (ex.: whatsapp_padrao)."}
      />

      <TextAreaField
        label="Valor"
        name="value"
        rows={6}
        defaultValue={setting ? settingValueToText(setting.value) : ""}
        placeholder='Texto simples ou JSON válido, ex.: {"instagram":"@elevon"}'
      />

      <SubmitButton>{setting ? "Salvar alterações" : "Criar configuração"}</SubmitButton>
    </form>
  );
}
