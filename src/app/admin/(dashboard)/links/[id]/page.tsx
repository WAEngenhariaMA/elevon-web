import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LinkForm } from "../link-form";
import { getLinkById } from "@/features/links/queries";
import { updateLink } from "@/features/links/actions";
import { getAllCategories } from "@/features/categories/queries";

export default async function EditLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [link, categories] = await Promise.all([getLinkById(id), getAllCategories().catch(() => [])]);
  if (!link) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/links" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos links
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar link</h1>
      <LinkForm link={link} categories={categories} action={updateLink.bind(null, id)} />
    </div>
  );
}
