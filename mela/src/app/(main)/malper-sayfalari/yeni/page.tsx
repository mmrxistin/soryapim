import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createMalperPage } from "../actions";

export const metadata = { title: "Yeni Malper Sayfası" };

export default function NewMalperPage() {
  return (
    <section className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#bb1919]">Yeni Sayfa</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Malper sayfası oluştur</h1>
        </div>
        <Link href="/admin/malper-sayfalari" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Listeye dön
        </Link>
      </div>

      <form action={createMalperPage} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Sayfa başlığı
            <input name="title" required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#bb1919] focus:ring-2 focus:ring-[#bb1919]/10" placeholder="Örnek: Hakkımızda" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            URL slug
            <input name="slug" required pattern="[a-z0-9-]+" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#bb1919] focus:ring-2 focus:ring-[#bb1919]/10" placeholder="hakkimizda" />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-semibold text-slate-700">
          Kısa açıklama
          <textarea name="description" rows={2} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#bb1919] focus:ring-2 focus:ring-[#bb1919]/10" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Düzen
            <select name="layout" defaultValue="standard" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#bb1919] focus:ring-2 focus:ring-[#bb1919]/10">
              <option value="standard">Standart</option>
              <option value="feature">Öne Çıkan</option>
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700">
            <input name="published" type="checkbox" defaultChecked className="size-4 rounded border-slate-300 text-[#bb1919] focus:ring-[#bb1919]" />
            Derhal yayınla
          </label>
        </div>

        <label className="block space-y-2 text-sm font-semibold text-slate-700">
          Sayfa içeriği
          <textarea name="content" required rows={14} className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 font-mono text-xs outline-none focus:border-[#bb1919] focus:ring-2 focus:ring-[#bb1919]/10" placeholder="Sayfa içeriğini yazın..." />
        </label>

        <div className="flex justify-end">
          <button type="submit" className="rounded-xl bg-[#bb1919] px-6 py-3 text-sm font-semibold text-white">Sayfayı oluştur</button>
        </div>
      </form>
    </section>
  );
}
