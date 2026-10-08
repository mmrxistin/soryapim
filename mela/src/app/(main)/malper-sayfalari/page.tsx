import { ArrowRight, FilePlus2, Layers3, PencilLine, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { MalperPageEditor } from "./MalperPageEditor";

export const metadata = { title: "Malper Sayfaları" };

export default async function MalperSayfalariPage() {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const pages = await prisma.malperPage.findMany({
    orderBy: [{ published: "desc" }, { updatedAt: "desc" }],
  });

  return (
    <section className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#bb1919]">Malper Yönetimi</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Sayfalar</h1>
          <p className="mt-2 text-sm text-slate-600">Malper’de yeni sayfalar oluşturun, yayın durumunu yönetin ve tasarımlarını güncelleyin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/malper-sayfalari/yeni" className="inline-flex items-center gap-2 rounded-xl bg-[#bb1919] px-4 py-2.5 text-sm font-semibold text-white">
            <FilePlus2 className="h-4 w-4" /> Yeni sayfa
          </Link>
          <Link href="/malper" className="inline-flex items-center gap-2 text-sm font-semibold text-[#bb1919]">
            Malper önizlemesi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#bb1919]/10 p-3 text-[#bb1919]"><Layers3 className="h-5 w-5" /></div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Yayınlanan sayfalar</h2>
                <p className="text-sm text-slate-500">Kayıtlı sayfalarınızın kısa durumunu kontrol edin.</p>
              </div>
            </div>

            <div className="space-y-3">
              {pages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  Henüz Malper sayfası eklenmemiş.
                </div>
              ) : pages.map((page) => (
                <div key={page.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{page.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${page.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                        {page.published ? "Yayında" : "Taslak"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">/malper/sayfa/{page.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/malper/sayfa/${page.slug}`} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">
                      <Search className="h-3.5 w-3.5" /> Görüntüle
                    </Link>
                    <MalperPageEditor page={page} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[#bb1919]/20 bg-[#bb1919] p-6 text-white shadow-sm">
            <FilePlus2 className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-black">Yeni sayfa ekle</h2>
            <p className="mt-2 text-sm text-white/75">Tek sayfalık bir Malper sayfası oluşturun ve doğrudan yayınlayın.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <p className="font-semibold text-slate-900">Admin güvenliği</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">Sayfalar yalnızca giriş yapmış yönetici tarafından değiştirilebilir ve URL çakışması engellenir.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <PencilLine className="h-5 w-5 text-[#bb1919]" />
            <h3 className="mt-3 font-semibold text-slate-900">Sayfa tasarımı</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Standart içerik görünümü veya büyük başlıklı özgün sayfa düzeni seçebilirsiniz.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
