import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClass =
  "focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm disabled:bg-slate-100";

export function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800">
      {children}
    </label>
  );
}

export function TextField({
  label,
  name,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; hint?: string }) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <input id={name} name={name} className={inputClass} {...props} />
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <textarea id={name} name={name} rows={4} className={inputClass} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; name: string; children: ReactNode }) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <select id={name} name={name} className={inputClass} {...props}>
        {children}
      </select>
    </div>
  );
}

export function ToggleField({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-4">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="focus-ring mt-0.5 h-4 w-4 rounded border-slate-400"
      />
      <span>
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-slate-500">{hint}</span>}
      </span>
    </label>
  );
}

export function ImageField({
  label,
  name,
  currentUrl,
}: {
  label: string;
  name: string;
  currentUrl?: string | null;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {currentUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentUrl}
          alt=""
          className="mt-2 h-32 w-full rounded-lg border border-slate-200 object-cover"
        />
      )}
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="focus-ring mt-2 w-full rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm"
      />
      <p className="mt-1.5 text-xs text-slate-500">
        {currentUrl ? "Envie um novo arquivo para substituir a imagem atual." : "PNG ou JPG."}
      </p>
    </div>
  );
}
