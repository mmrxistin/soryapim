"use client";

import { useState } from "react";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { deleteMalperPage, updateMalperPage } from "./actions";
import type { MalperPage } from "@prisma/client";

interface MalperPageEditorProps {
  page: MalperPage;
}

const baseInput = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#bb1919] focus:ring-2 focus:ring-[#bb1919]/10";

export function MalperPageEditor({ page }: MalperPageEditorProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      await updateMalperPage(page.id, formData);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
      >
        <Pencil className="h-3.5 w-3.5" /> Düzenle
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#bb1919]">Sayfa düzenleyici</p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">{page.title}</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-slate-200 p-2 text-slate-500">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form action={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Sayfa başlığı
                  <input name="title" defaultValue={page.title} required className={baseInput} />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  URL slug
                  <input name="slug" defaultValue={page.slug} pattern="[a-z0-9-]+" required className={baseInput} />
                </label>
              </div>

              <label className="block space-y-2 text-sm font-semibold text-slate-700">
                Kısa açıklama
                <textarea name="description" defaultValue={page.description ?? ""} rows={2} className={baseInput} />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Düzen
                  <select name="layout" defaultValue={page.layout} className={baseInput}>
                    <option value="standard">Standart</option>
                    <option value="feature">Öne Çıkan</option>
                  </select>
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700">
                  <input name="published" type="checkbox" defaultChecked={page.published} className="size-4 rounded border-slate-300 text-[#bb1919] focus:ring-[#bb1919]" />
                  Yayında yayınla
                </label>
              </div>

              <label className="block space-y-2 text-sm font-semibold text-slate-700">
                Sayfa içeriği
                <textarea name="content" defaultValue={page.content} required rows={12} className={`${baseInput} resize-y font-mono text-xs`} />
              </label>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  <X className="h-4 w-4" /> Kapat
                </button>
                <div className="flex items-center gap-3">
                  <form action={async () => deleteMalperPage(page.id)}>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                    >
                      <Trash2 className="h-4 w-4" /> Sil
                    </button>
                  </form>
                  <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#bb1919] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                    <Save className="h-4 w-4" /> {pending ? "Kaydediliyor..." : "Değişiklikleri kaydet"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
