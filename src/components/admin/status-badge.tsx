export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
      }`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}

export function FeaturedBadge({ featured }: { featured: boolean }) {
  if (!featured) return null;
  return (
    <span className="ml-2 inline-flex rounded-full bg-[#D4AF37]/15 px-2.5 py-1 text-xs font-semibold text-[#8a6d1c]">
      Destaque
    </span>
  );
}
