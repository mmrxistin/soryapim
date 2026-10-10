// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import React from "react";
import Link from "next/link";
import { AGENCY, STATS, CASES, SERVICES, CLIENTS } from "./ajans-veri";
import HeroUnderwaterScene from "./components/hero-underwater";
import ParvekirinaYek from "./components/parvekirin";

const MARQUEE = "FİKİRDEN ETKİYE — RED YAPIM — ";

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <style>{`
        @keyframes red-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .red-marquee-track { display: inline-flex; white-space: nowrap; animation: red-marquee 28s linear infinite; }
        .red-marquee-track:hover { animation-play-state: paused; }
        @keyframes red-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        .red-float { animation: red-float 6s ease-in-out infinite; }
        @keyframes red-grid-pulse { 0%,100% { opacity: .25; } 50% { opacity: .55; } }
        .red-grid { animation: red-grid-pulse 5s ease-in-out infinite; }
      `}</style>

      {/* ======== HERO — SU ALTI 360 SAHNE (metinsiz) ======== */}
      <section
        className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden"
        aria-label="Su alti 360 sahnesi"
      >
        <HeroUnderwaterScene />
      </section>

      {/* ======== MARQUEE ======== */}
      <section className="border-y border-white/10 py-10">
        <div className="red-marquee-track text-5xl font-black uppercase tracking-tight text-white/90 sm:text-7xl">
          {[0, 1].map((i) => (
            <span key={i} className="pr-8">
              {MARQUEE.repeat(3)}
            </span>
          ))}
        </div>
      </section>

      {/* ======== STATS ======== */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="bg-zinc-950 p-10 transition-colors hover:bg-zinc-900">
              <div className="text-5xl font-black tracking-tight text-[#ff4d00] lg:text-6xl">{s.n}</div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ======== WORK ======== */}
      <section id="work" className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Seçili İşler</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">İşler</h2>
            </div>
            <Link
              href="/malper/isler"
              className="group text-xs font-black uppercase tracking-[0.16em] text-zinc-300 no-underline transition-colors hover:text-white"
            >
              Tüm portföy <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASES.map((c, i) => (
              <Link
                key={c.brand}
                href="/malper/isler"
                className={`group relative block overflow-hidden rounded-3xl bg-zinc-900 no-underline ${i === 0 ? "md:col-span-2" : ""
                  }`}
              >
                <div className={`${i === 0 ? "h-[420px] md:h-[560px]" : "h-[380px]"} w-full overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.brand}
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <span className="mb-3 inline-block rounded-full bg-[#ff4d00] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                    {c.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white sm:text-3xl">{c.brand}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{c.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SERVICES ======== */}
      <section id="services" className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Ne yapıyoruz</p>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">Hizmetler</h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.n}
                href="/malper/hizmetler"
                className="group relative bg-zinc-950 p-10 no-underline transition-colors hover:bg-[#ff4d00]"
              >
                <span className="font-mono text-xs tracking-widest text-[#ff4d00] transition-colors group-hover:text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-2xl font-black text-white">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 transition-colors group-hover:text-white/85">
                  {s.d}
                </p>
                <span className="absolute right-8 top-8 text-xl text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-white">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== MANIFESTO ======== */}
      <section className="px-4 py-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Manifesto</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            “İyi fikirler, cesur markalar ve
            <span className="text-[#ff4d00]"> korkusuz insanlar</span> arasında doğar.”
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-400">
            Farklı disiplinlerden, kültürlerden ve dillerden gelen ekiplerimiz;
            birbirinden öğrenerek, deneyerek ve gülerek çalışır. Çünkü en iyi
            işler, en mutlu masalarda çıkar.
          </p>
        </div>
      </section>

      {/* ======== NEWS ======== */}
      <section className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Güncel</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">Haberler</h2>
            </div>
          </div>
          <ParvekirinaYek />
        </div>
      </section>

      {/* ======== CLIENTS ======== */}
      <section className="border-y border-white/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
            Birlikte çalıştığımız markalar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {CLIENTS.map((b) => (
              <span
                key={b}
                className="text-xl font-black tracking-tight text-zinc-700 transition-colors hover:text-[#ff4d00] sm:text-2xl"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CONTACT CTA ======== */}
      <section className="px-4 py-32 text-center sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Bir sonraki
            <br />
            <span className="text-[#ff4d00]">büyük fikir</span>
            <br />
            seninle başlasın
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/malper/iletisim"
              className="rounded-full bg-[#ff4d00] px-10 py-5 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
            >
              Proje başlat
            </Link>
            <a
              href={`mailto:${AGENCY.email}`}
              className="rounded-full border border-white/25 px-10 py-5 text-xs font-black uppercase tracking-[0.16em] no-underline transition-all hover:border-[#ff4d00] hover:text-[#ff4d00]"
            >
              {AGENCY.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin


