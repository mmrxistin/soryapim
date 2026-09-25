// Bismillahirrahmanirrahim
// Tüm Yazarlar Grid Bileşeni
"use client";

import React from "react";

const allAuthors = [
  { name: "Ender İmrek", initial: "E", color: "bg-red-600" },
  { name: "Ahmet Güneş", initial: "A", color: "bg-zinc-800" },
  { name: "Dicle Anter", initial: "D", color: "bg-red-700" },
  { name: "Bahadır Altan", initial: "B", color: "bg-zinc-900" },
  { name: "Ertuğrul Kürkçü", initial: "E", color: "bg-red-800" },
  { name: "Veysi Sarısözen", initial: "V", color: "bg-zinc-700" },
  { name: "Ayşe Düzkan", initial: "A", color: "bg-red-900" },
  { name: "Metin Yeğin", initial: "M", color: "bg-zinc-800" },
];

export default function MmAuthorGrid() {
  return (
    <section className="py-8 bg-zinc-50 border-t border-zinc-200 px-4 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-sm font-black uppercase tracking-[0.14em] border-b-[3px] border-zinc-900 pb-2 mb-6">
          YAZARLAR
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {allAuthors.map((author, idx) => (
            <a key={idx} href="#" className="flex flex-col items-center group">
              <div className={`w-16 h-16 ${author.color} rounded-full flex items-center justify-center text-white text-xl font-black mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
                {author.initial}
              </div>
              <span className="text-[11px] font-bold text-center uppercase tracking-tighter text-zinc-700 group-hover:text-[#d90000] transition-colors">
                {author.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
