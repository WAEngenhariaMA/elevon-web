import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BannerForm } from "../banner-form";
import { createBanner } from "@/features/banners/actions";

export default function NewBannerPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/banners" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos banners
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Novo banner</h1>
      <BannerForm action={createBanner} />
    </div>
  );
}
