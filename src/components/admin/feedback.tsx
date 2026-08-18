export function FlashMessage({ success, error }: { success?: string; error?: string }) {
  if (!success && !error) return null;

  return (
    <div
      role="status"
      className={`mt-6 rounded-lg p-3 text-sm ${
        error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {error ?? success}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
      {message}
    </p>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
