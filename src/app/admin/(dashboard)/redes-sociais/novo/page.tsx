import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SocialForm } from "../social-form";
import { createSocialLink } from "@/features/social/actions";

export default function NewSocialLinkPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/redes-sociais"
        className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600"
      >
        <ArrowLeft size={16} /> Voltar às redes sociais
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Nova rede social</h1>
      <SocialForm action={createSocialLink} />
    </div>
  );
}
