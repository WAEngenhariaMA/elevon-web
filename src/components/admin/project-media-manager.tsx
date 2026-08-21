"use client";

import { useActionState } from "react";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { createProjectMedia, deleteProjectMedia, updateProjectMedia } from "@/features/projects/media-actions";
import type { ProjectMedia } from "@/features/projects/media-queries";

export function ProjectMediaManager({ projectId, media }: { projectId: string; media: ProjectMedia[] }) {
  const [state, formAction] = useActionState(createProjectMedia.bind(null, projectId), {});

  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-semibold">Galeria do projeto</h2>
      <p className="mt-2 text-sm text-slate-600">
        Adicione screenshots e imagens que serão exibidas na página pública deste case.
      </p>

      <form action={formAction} className="mt-6 grid gap-4 rounded-xl border border-slate-200 p-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800 md:col-span-2">
          Imagem
          <input
            required
            name="image"
            type="file"
            accept="image/*"
            className="focus-ring mt-2 w-full rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Texto alternativo
          <input name="alt_text" className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Legenda
          <input name="caption" className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Ordem
          <input name="sort_order" type="number" defaultValue={0} className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </label>
        <label className="flex items-center gap-2 self-end rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-800">
          <input name="active" type="checkbox" defaultChecked /> Ativa
        </label>
        <div className="md:col-span-2">
          {state.error && <p role="alert" className="mb-3 text-sm text-red-600">{state.error}</p>}
          {state.success && <p role="status" className="mb-3 text-sm text-emerald-600">{state.success}</p>}
          <button className="focus-ring rounded-lg bg-[#0B1320] px-4 py-3 text-sm font-bold text-white">Adicionar à galeria</button>
        </div>
      </form>

      {media.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
          Nenhuma imagem adicionada à galeria ainda.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {media.map((item) => (
            <ProjectMediaItem key={item.id} projectId={projectId} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectMediaItem({ projectId, item }: { projectId: string; item: ProjectMedia }) {
  const [editState, editAction, isPending] = useActionState(
    updateProjectMedia.bind(null, projectId, item.id),
    {},
  );

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image_url} alt={item.alt_text ?? ""} className="h-48 w-full object-cover" />
      <form action={editAction} className="space-y-4 p-4">
        <label className="block text-sm font-medium text-slate-800">
          Texto alternativo
          <input name="alt_text" defaultValue={item.alt_text ?? ""} className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Legenda
          <input name="caption" defaultValue={item.caption ?? ""} className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-800">
            Ordem
            <input name="sort_order" type="number" defaultValue={item.sort_order} className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
          </label>
          <label className="flex items-center gap-2 self-end rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-800">
            <input name="active" type="checkbox" defaultChecked={item.active} /> Ativa
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button disabled={isPending} className="focus-ring rounded-lg bg-[#0B1320] px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60">
            {isPending ? "Salvando..." : "Salvar"}
          </button>
          <ConfirmDeleteButton
            action={deleteProjectMedia.bind(null, projectId, item.id)}
            confirmMessage="Excluir esta imagem da galeria?"
          />
          {editState.error && <p role="alert" className="text-xs text-red-600">{editState.error}</p>}
          {editState.success && <p role="status" className="text-xs text-emerald-600">{editState.success}</p>}
        </div>
      </form>
    </article>
  );
}
