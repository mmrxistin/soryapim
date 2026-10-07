// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import Link from "next/link";
import { CASES, STATS, AGENCY } from "../ajans-veri";

export const metadata = { title: "İşler" };

export default function IslerPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="border-b border-white/10 px-4 pb-20 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Portföy</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter sm:text-8xl">İşler</h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-400">
            Markalar için ürettiğimiz dönüştürücü işler — stratejiden ekranlargelen üretime.
          </p>
        </div>
      </section>

      {/* CASES — tek kolon dev kartlar */}
      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-16">
          {CASES.map((c, i) => (
            <article key={c.brand} className="group">
              <div className="relative overflow-hidden rounded-3xl">
                <div className="h-[420px] w-full overflow-hidden md:h-[640px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.brand}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
                <span className="absolute left-8 top-8 font-mono text-sm text-white/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-[#ff4d00]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#ff4d00]">
                    {c.tag}
                  </span>
                  <h2 className="text-3xl font-black sm:text-4xl">{c.brand}</h2>
                  <p className="mt-1 text-zinc-400">{c.title}</p>
                </div>
                <Link
                  href="/malper/iletisim"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] no-underline transition-all hover:border-[#ff4d00] hover:text-[#ff4d00]"
                >
                  Detaylı görüşelim
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-black text-[#ff4d00] lg:text-5xl">{s.n}</div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-10">
        <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Sıradaki iş <span className="text-[#ff4d00]">seninki</span> olsun
        </h2>
        <Link
          href="/malper/iletisim"
          className="mt-10 inline-block rounded-full bg-[#ff4d00] px-10 py-4 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
        >
          {AGENCY.email}
        </Link>
      </section>
    </main>
  );
}
