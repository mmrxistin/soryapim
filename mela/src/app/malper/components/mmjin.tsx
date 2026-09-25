// Bismillahirrahmanirrahim
// Jin Dergi Özel Bölümü
"use client";

import React from "react";

const jinArticles = [
  {
    id: 1,
    title: "Kadın özgürlük mücadelesinde yeni bir dönem",
    author: "Ayşe Düzkan",
    img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/823x463cc-amd-29-08-26-gulistan-doku-dosya-yeni-gelisme-350x250.jpeg",
    href: "/malper/rojname"
  },
  {
    id: 2,
    title: "Ekoloji ve kadın: Doğa ile kurulan bağ",
    author: "Zeynep Kuray",
    img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/690x390cc-mrk-28-08-2028-turk-sihasi-yunanitan-havaalanina-girdi-360x180.jpg",
    href: "/malper/rojname"
  }
];

export default function MmJinDergi({
  sidebar = false,
  mansetData = null
}: {
  sidebar?: boolean;
  mansetData?: { img: string; title: string; href: string } | null;
}) {
  // Eğer dışarıdan veri gelmişse onu kullan, gelmemişse varsayılanları kullan
  const displayArticles = mansetData
    ? [{ id: 0, title: mansetData.title, author: "Jin Dergi", img: mansetData.img, href: mansetData.href }, ...jinArticles.slice(0, 1)]
    : jinArticles;

  if (sidebar) {
    const mainArt = displayArticles[0];
    return (
      <div className="mm-tv-card overflow-hidden border-[#8224e3]/20 dark:border-[#8224e3]/30">
        <div className="bg-[#8224e3] p-4 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white m-0 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            JIN DERGİ
          </h2>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-950 flex flex-col items-center">
          {/* Dergi Kapağı */}
          <a
            href="https://jindergi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full aspect-[3/4] overflow-hidden group rounded-md shadow-lg border border-zinc-100 dark:border-zinc-800"
          >
            <img
              src={mainArt.img}
              alt={mainArt.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </a>

          <div className="mt-4 text-center w-full">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">
              {mainArt.title}
            </h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Yeni Sayı Yayında</p>

            <a
              href="https://jindergi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-2.5 bg-[#8224e3] text-white text-[10px] font-black uppercase tracking-widest rounded hover:bg-zinc-900 transition-colors shadow-lg shadow-[#8224e3]/20"
            >
              DERGİYİ OKU
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 bg-[#fdf2f2] dark:bg-zinc-900/50 border-y border-red-100 dark:border-red-900/20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">

          {/* Sol: Büyük Jin Dergi Logosu/Kapağı */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-red-50 dark:border-red-900/10">
            <div className="text-[#d90000] text-5xl font-black italic tracking-tighter mb-4">Jin</div>
            <h2 className="text-2xl font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-2">DERGİ</h2>
            <div className="w-16 h-1 bg-[#d90000] mb-6"></div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium mb-8">
              "Kadınların sesi, özgür yaşamın izi..."
            </p>
            <a
              href="/malper/rojname"
              className="px-8 py-3 bg-[#d90000] text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-zinc-900 dark:hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
            >
              DERGİYİ OKU
            </a>
          </div>

          {/* Sağ: Yazılar */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {jinArticles.map((article) => (
              <a key={article.id} href={article.href} className="group flex flex-col bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-zinc-100 dark:border-zinc-800">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-black text-[#d90000] uppercase tracking-widest mb-2">{article.author}</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-[#d90000] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Devamını Oku
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
