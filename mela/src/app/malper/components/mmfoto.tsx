// Bismillahirrahmanirrahim
// Foto Galeri Bileşeni
"use client";

import React from "react";

const photos = [
  { id: 1, title: "Amed Sokaklarında Yaşam", img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/mrd-29-08-26-nisebin-taziye-ucuncu-gun23-750x375.jpg" },
  { id: 2, title: "Ekolojik Yıkım ve Direniş", img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/690x390cc-mrk-28-08-2028-turk-sihasi-yunanitan-havaalanina-girdi-360x180.jpg" },
  { id: 3, title: "Kadınların Özgürlük Yürüyüşü", img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/823x463cc-amd-29-08-26-gulistan-doku-dosya-yeni-gelisme-350x250.jpeg" },
  { id: 4, title: "Kültürel Mirasın İzleri", img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/amd-29-08-2026-3genc-tahliye-350x250.jpeg" },
];

export default function MmPhotoGallery() {
  return (
    <section className="py-8 bg-white border-t border-zinc-200 px-4 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] border-b-[3px] border-zinc-900 pb-2">
            FOTO GALERİ
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {photos.map((p) => (
            <a key={p.id} href="#" className="min-w-[280px] md:min-w-[320px] group relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#d90000] transition-colors">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
