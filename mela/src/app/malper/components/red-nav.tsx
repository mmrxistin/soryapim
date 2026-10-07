// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { NAV_LINKS, AGENCY } from "../ajans-veri";

export default function RedNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
            ? "border-b border-white/10 bg-zinc-950/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* LOGO */}
          <Link href="/malper" className="group flex items-center gap-2 no-underline">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ff4d00] text-sm font-black text-white transition-transform group-hover:rotate-90">
              R
            </span>
            <span className="text-lg font-black uppercase tracking-tight text-white">
              Red<span className="text-[#ff4d00]">Yapım</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-xs font-bold uppercase tracking-[0.18em] text-white/70 no-underline transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* THEME */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Tema değiştir"
                className="hidden h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00] sm:grid"
              >
                {resolvedTheme === "dark" ? "☾" : "☀"}
              </button>
            )}
            {/* CTA */}
            <Link
              href="/malper/iletisim"
              className="hidden rounded-full bg-[#ff4d00] px-6 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950 md:block"
            >
              Proje Başlat
            </Link>
            {/* BURGER */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menü"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 lg:hidden"
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU — tam ekran */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-zinc-950 px-8 transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-4xl font-black uppercase tracking-tight text-white no-underline transition-colors hover:text-[#ff4d00]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mr-3 text-sm font-mono text-[#ff4d00]">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${AGENCY.email}`}
          className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-[#ff4d00] no-underline"
        >
          {AGENCY.email}
        </a>
      </div>
    </>
  );
}
