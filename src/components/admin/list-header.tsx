import Link from "next/link";
import { Plus } from "lucide-react";

export function ListHeader({
  title,
  description,
  newHref,
  newLabel,
}: {
  title: string;
  description: string;
  newHref: string;
  newLabel: string;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold tracking-[.18em] text-[#2563EB]">ADMINISTRAÇÃO</p>
        <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>
      <Link
        href={newHref}
        className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[#0B1320] px-4 py-3 text-sm font-bold text-white"
      >
        <Plus size={17} /> {newLabel}
      </Link>
    </header>
  );
}
