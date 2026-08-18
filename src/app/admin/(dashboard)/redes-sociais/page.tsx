import Link from "next/link";
import { Pencil } from "lucide-react";
import { ListHeader } from "@/components/admin/list-header";
import { FlashMessage, EmptyState } from "@/components/admin/feedback";
import { StatusBadge } from "@/components/admin/status-badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { getAllSocialLinks } from "@/features/social/queries";
import { deleteSocialLink } from "@/features/social/actions";

export default async function SocialLinksPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const socialLinks = await getAllSocialLinks().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <ListHeader
        title="Redes sociais"
        description="Perfis oficiais da Elevon exibidos no site e na página de links."
        newHref="/admin/redes-sociais/novo"
        newLabel="Nova rede social"
      />

      <FlashMessage success={success} error={error} />

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Plataforma</th>
                <th className="px-6 py-4 font-semibold">URL</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {socialLinks.map((social) => (
                <tr key={social.id}>
                  <td className="px-6 py-4 font-medium capitalize">{social.platform}</td>
                  <td className="max-w-70 truncate px-6 py-4 text-slate-500">{social.url}</td>
                  <td className="px-6 py-4">
                    <StatusBadge active={social.active} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/redes-sociais/${social.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] hover:bg-blue-50"
                      >
                        <Pencil size={14} /> Editar
                      </Link>
                      <ConfirmDeleteButton action={deleteSocialLink.bind(null, social.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {socialLinks.length === 0 && (
            <EmptyState title="Nenhuma rede social ainda" description="Adicione os perfis oficiais da Elevon." />
          )}
        </div>
      </section>
    </div>
  );
}
