import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BannerForm } from "../banner-form";
import { getBannerById } from "@/features/banners/queries";
import { updateBanner } from "@/features/banners/actions";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const banner = await getBannerById(id);
  if (!banner) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/banners" className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft size={16} /> Voltar aos banners
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Editar banner</h1>
      <BannerForm banner={banner} action={updateBanner.bind(null, id, banner.image_url)} />
    </div>
  );
}
