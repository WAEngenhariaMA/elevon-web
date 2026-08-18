import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LinkForm } from "../link-form";
import { createLink } from "@/features/links/actions";
import { getAllCategories } from "@/features/categories/queries";

export default async function NewLinkPage() {
  const categories = await getAllCategories().catch(() => []);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/links" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos links
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Novo link</h1>
      <LinkForm categories={categories} action={createLink} />
    </div>
  );
}
