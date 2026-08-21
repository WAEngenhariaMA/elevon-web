"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectMedia } from "@/features/projects/media-queries";

export function ProjectGallery({ media, projectTitle, accentColor }: { media: ProjectMedia[]; projectTitle: string; accentColor: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? media[selectedIndex] : null;
  const galleryGridClass = media.length === 1 ? "grid-cols-1 max-w-5xl" : media.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  const previous = () => setSelectedIndex((current) => current === null ? 0 : (current - 1 + media.length) % media.length);
  const next = () => setSelectedIndex((current) => current === null ? 0 : (current + 1) % media.length);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [selectedIndex, media.length]);

  return <><div className={`mt-10 grid gap-5 ${galleryGridClass}`}>{media.map((item, index) => <figure key={item.id} className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${media.length === 1 ? "p-6" : "p-3"}`}><button type="button" onClick={() => setSelectedIndex(index)} className="focus-ring relative w-full cursor-zoom-in"><img src={item.image_url} alt={item.alt_text ?? item.caption ?? projectTitle} className="max-h-[680px] w-full object-contain" /><span className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white"><Maximize2 size={15} /></span></button>{item.caption && <figcaption className="px-2 pb-1 pt-4 text-sm text-slate-400">{item.caption}</figcaption>}</figure>)}</div>
  {selectedItem && <div role="dialog" aria-modal="true" aria-label={`Visualização da imagem ${selectedIndex! + 1} de ${media.length}`} onClick={() => setSelectedIndex(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"><div onClick={(event) => event.stopPropagation()} className="relative flex max-h-[92vh] w-full max-w-[1500px] flex-col rounded-2xl bg-[#0B1320] p-4 sm:p-6"><div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-white">Interfaces e aplicações</p><p className="mt-1 text-xs font-bold" style={{ color: accentColor }}>{selectedIndex! + 1} / {media.length}</p></div><button type="button" onClick={() => setSelectedIndex(null)} aria-label="Fechar imagem" className="focus-ring rounded-full p-2 text-white hover:bg-white/10"><X /></button></div><div className="relative flex min-h-0 flex-1 items-center justify-center"><img src={selectedItem.image_url} alt={selectedItem.alt_text ?? selectedItem.caption ?? projectTitle} className="max-h-[78vh] w-full object-contain" />{media.length > 1 && <><button type="button" onClick={previous} aria-label="Imagem anterior" className="focus-ring absolute left-0 rounded-full bg-black/40 p-2 text-white"><ChevronLeft /></button><button type="button" onClick={next} aria-label="Próxima imagem" className="focus-ring absolute right-0 rounded-full bg-black/40 p-2 text-white"><ChevronRight /></button></>}</div>{selectedItem.caption && <p className="pt-4 text-sm text-slate-300">{selectedItem.caption}</p>}</div></div>}</>;
}
