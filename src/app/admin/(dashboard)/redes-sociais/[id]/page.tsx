import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SocialForm } from "../social-form";
import { getSocialLinkById } from "@/features/social/queries";
import { updateSocialLink } from "@/features/social/actions";

export default async function EditSocialLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const social = await getSocialLinkById(id);
  if (!social) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/redes-sociais"
        className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600"
      >
        <ArrowLeft size={16} /> Voltar às redes sociais
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar rede social</h1>
      <SocialForm social={social} action={updateSocialLink.bind(null, id)} />
    </div>
  );
}
