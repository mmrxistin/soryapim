// Bismillahirahmanirahim
// Elhamdulillahirrabbulalemin
import React from 'react'
import Link from 'next/link'

const CASES = [
  {
    brand: 'Vestel', title: 'Ev her şeyin merkezinde', tag: 'Marka Kampanyası',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80',
  },
  {
    brand: 'Arçelik', title: 'Geleceği birlikte inşa etmek', tag: 'Strateji & Tasarım',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
  },
  {
    brand: 'Pegasus', title: 'Uçuşa dair her an yaratıcı', tag: 'Dijital & Sosyal',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  },
  {
    brand: 'Ülker', title: 'Tatlı bir hikaye anlatımı', tag: 'İçerik Prodüksiyon',
    img: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&q=80',
  },
]

const SERVICES = [
  { n: '01', t: 'Marka Stratejisi', d: 'Araştırma, konumlandırma ve marka mimarisi ile markanızı geleceğe taşıyoruz.' },
  { n: '02', t: 'Yaratıcı & Tasarım', d: 'Kampanya fikirleri, kimlik tasarımı ve her mecra için özgün içerik üretimi.' },
  { n: '03', t: 'Dijital & Sosyal Medya', d: 'Veriyle hareket eden sosyal medya, performans pazarlaması ve CRM çözümleri.' },
  { n: '04', t: 'Prodüksiyon', d: 'Film, fotoğraf ve Motion Design — düşünceden ekrana uçtan uca prodüksiyon.' },
  { n: '05', t: 'Medya Planlama', d: 'Doğru mecra, doğru zaman, doğru kitle. Etki odaklı medya stratejileri.' },
  { n: '06', t: 'Veri & Ölçümleme', d: 'Analitik, insight ve ROI raporlamasıyla her kampanyayı ölçülebilir kılıyoruz.' },
]

const NEWS = [
  { cat: 'Ödüller', date: 'Eylül 2026', title: 'Creativity Awards 2026’da 3 altın, 5 gümüş madalya', href: '#' },
  { cat: 'Kampanya', date: 'Ağustos 2026', title: 'Yeni marka kampanyamız 40 milyon kişiye ulaştı', href: '#' },
  { cat: 'Ajans', date: 'Temmuz 2026', title: 'Ajansımız Effectiveness Network’e katıldı', href: '#' },
  { cat: 'Sektör', date: 'Haziran 2026', title: 'CEO’muz Cannes Lions jürisinde görev aldı', href: '#' },
]

const STATS = [
  { n: '120+', l: 'Marka Ortağı' },
  { n: '340', l: 'Ödül' },
  { n: '18', l: 'Ülke' },
  { n: '96%', l: 'Müşteri Devamı' },
]

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-zinc-950 text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-24 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">
            Productive Agency — RED Yapım
          </p>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Fikirleri
            <span className="block text-[#ff4d00]">etkiye</span>
            dönüştürüyoruz
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-300">
            Strateji, yaratıcılık ve teknolojiyi birleştirerek markaların dünya ile konuşma biçimini yeniden tasarlıyoruz.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-full bg-[#ff4d00] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
            >
              İşlerimizi Görün
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/40 px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
            >
              Birlikte Çalışalım
            </a>
          </div>
        </div>
      </section>

      {/* STATS ŞERİDİ */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.l} className="text-center lg:text-left">
              <div className="text-4xl font-black tracking-tight text-[#ff4d00] lg:text-5xl">{s.n}</div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK — SEÇİLİ İŞLER */}
      <section id="work" className="bg-white px-4 py-24 sm:px-6 dark:bg-zinc-950 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Seçili İşler</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">İşler</h2>
            </div>
            <a href="#" className="group text-xs font-black uppercase tracking-[0.16em] text-zinc-900 no-underline dark:text-zinc-100">
              Tüm Portföy <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASES.map((c, i) => (
              <a
                key={c.brand}
                href="#"
                className={`group relative block overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className={`${i === 0 ? 'h-[420px] md:h-[560px]' : 'h-[380px]'} w-full overflow-hidden`}>
                  <img
                    src={c.img}
                    alt={c.brand}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <span className="mb-3 inline-block rounded-full bg-[#ff4d00] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                    {c.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white sm:text-3xl">{c.brand}</h3>
                  <p className="mt-1 text-sm text-zinc-200">{c.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:px-8 dark:bg-zinc-900">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Ne Yapıyoruz</p>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">Hizmetler</h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.n} className="group bg-zinc-950 p-10 transition-colors hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                <span className="text-xs font-black tracking-widest text-[#ff4d00]">{s.n}</span>
                <h3 className="mt-4 text-2xl font-black">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE / MANIFESTO */}
      <section id="culture" className="bg-white px-4 py-24 sm:px-6 dark:bg-zinc-950 lg:px-8">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Kültürümüz</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            “İyi fikirler, cesur markalar ve
            <span className="text-[#ff4d00]"> korkusuz insanlar</span> arasında doğar.”
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Farklı disiplinlerden, kültürlerden ve dillerden gelen ekiplerimiz; birbirinden öğrenerek,
            deneyerek ve gülerek çalışır. Çünkü en iyi işler, en mutlu masalarda çıkar.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {['Çeşitlilik & Kapsayıcılık', 'Sürdürülebilirlik', 'Sürekli Öğrenme'].map((v) => (
              <div key={v} className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
                <h3 className="text-sm font-black uppercase tracking-[0.14em]">{v}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS — AJANS HABERLERİ */}
      <section id="news" className="border-t border-zinc-200 bg-zinc-50 px-4 py-24 sm:px-6 dark:border-zinc-800 dark:bg-zinc-900 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Güncel</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">Ajans Haberleri</h2>
            </div>
            <a href="#" className="group text-xs font-black uppercase tracking-[0.16em] no-underline">
              Tüm Haberler <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
            {NEWS.map((n) => (
              <li key={n.title}>
                <a href={n.href} className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-8 no-underline transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#ff4d00]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#ff4d00]">{n.cat}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">{n.date}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold leading-snug text-zinc-900 transition-colors group-hover:text-[#ff4d00] dark:text-zinc-100">
                    {n.title}
                  </h3>
                  <span className="mt-auto pt-6 text-xs font-black uppercase tracking-[0.14em] text-zinc-900 dark:text-zinc-100">
                    Oku <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLIENTS ŞERİDİ */}
      <section className="border-y border-zinc-200 bg-white px-4 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Birlikte Çalıştığımız Markalar</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {['VESTEL', 'ARÇELİK', 'PEGASUS', 'ÜLKER', 'TURKCELL', 'GARANTİ', 'FLO', 'BEKO'].map((b) => (
              <span key={b} className="text-xl font-black tracking-tight text-zinc-300 transition-colors hover:text-[#ff4d00] sm:text-2xl dark:text-zinc-700 dark:hover:text-[#ff4d00]">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS CTA */}
      <section id="careers" className="bg-[#ff4d00] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-white/70">Kariyer</p>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
              Cesur fikirlerin<br />peşinden geliyor musun?
            </h2>
          </div>
          <a
            href="#contact"
            className="shrink-0 rounded-full bg-zinc-950 px-10 py-5 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-transform hover:scale-105"
          >
            Açık Pozisyonlar →
          </a>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="bg-zinc-950 px-4 py-32 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Bir sonraki<br />
            <span className="text-[#ff4d00]">büyük fikir</span><br />
            seninle başlasın
          </h2>
          <a
            href="mailto:hello@redyapim.com"
            className="mt-12 inline-block rounded-full border border-white/40 px-10 py-5 text-xs font-black uppercase tracking-[0.16em] no-underline transition-all hover:bg-[#ff4d00] hover:border-[#ff4d00]"
          >
            hello@redyapim.com
          </a>
        </div>
      </section>
    </main>
  )
}
