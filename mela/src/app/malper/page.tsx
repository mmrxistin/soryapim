// Bismillahirahmanirahim
// Elhamdulillahirrabbulalemin
// Esselatu vesselamu ala seyyidina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Allah u Ekber Ve Lillahil Hamd

// El Hamdu Lîllah ya Rabbi'l-Âlemîn, El Hamdu Lîllah yâ Rabbi'l-Âlemîn, El Hamdu Lîllah yâ Rabbi'l-Âlemîn
// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehu'l-hamdu.
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir

import React from 'react'
import MansetSlider from './components/mmanset'
import MmSlider from './components/mmslider'
import MmVideoGallery from './components/mmvideos'
import MmPhotoGallery from './components/mmfoto'
import MmAuthorGrid from './components/mmyazarliste'
import MmJinDergi from './components/mmjin'

function page() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <MmSlider />

      {/* LEAD BÖLÜMÜ: büyük manşet solda, liste sağda */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-6 sm:px-6">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border border-zinc-200 dark:border-zinc-700 overflow-hidden rounded-lg shadow-sm">
              <MansetSlider />
            </div>
          </div>

          {/* Sağ kolon — Öne Çıkanlar listesi */}
          <div className="lg:col-span-4">
            <h2 className="mb-0 border-b-[3px] border-zinc-900 dark:border-zinc-100 pb-2 text-sm font-black uppercase tracking-[0.14em]">
              Öne Çıkanlar
            </h2>

            <ul className="m-0 list-none divide-y divide-zinc-200 dark:divide-zinc-800 p-0">
              <li>
                <a href="/malper/penc" className="group flex gap-3 py-4 no-underline">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded">
                    <img
                      src="https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/690x390cc-mrk-28-08-2028-turk-sihasi-yunanitan-havaalanina-girdi-360x180.jpg"
                      alt="Ekoloji"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000]">Ekoloji</span>
                    <h3 className="mt-1 text-sm font-bold leading-5 text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline">
                      Gîyadin'de siyanür süreci başladı!
                    </h3>
                  </div>
                </a>
              </li>
              <li>
                <a href="/malper/car" className="group flex gap-3 py-4 no-underline">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded">
                    <img
                      src="https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/amd-29-08-2026-3genc-tahliye-350x250.jpeg"
                      alt="Gündem"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000]">Gündem</span>
                    <h3 className="mt-1 text-sm font-bold leading-5 text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline">
                      Uyuşturucuya karşı çıktığı için tutuklanan 3 genç tahliye edildi
                    </h3>
                  </div>
                </a>
              </li>
              <li>
                <a href="/malper/rojname" className="group flex gap-3 py-4 no-underline">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded">
                    <img
                      src="https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/mrd-29-08-26-nisebin-taziye-ucuncu-gun23-750x375.jpg"
                      alt="Dünya"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000]">Dünya</span>
                    <h3 className="mt-1 text-sm font-bold leading-5 text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline">
                      Türkiye İHA'sı Yunanistan havaalanına girdi
                    </h3>
                  </div>
                </a>
              </li>
              <li>
                <a href="/malper/dirok" className="group flex gap-3 py-4 no-underline">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded">
                    <img
                      src="https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/823x463cc-amd-29-08-26-gulistan-doku-dosya-yeni-gelisme-350x250.jpeg"
                      alt="Güncel"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000]">Güncel</span>
                    <h3 className="mt-1 text-sm font-bold leading-5 text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline">
                      Gülistan Doku'nun kaybolduğu saatlerde telefon görüşmesi ortaya çıktı
                    </h3>
                  </div>
                </a>
              </li>
            </ul>

            <a
              href="/malper/yek"
              className="mt-4 inline-block border border-zinc-900 dark:border-zinc-100 px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-zinc-900 dark:text-zinc-100 no-underline transition-colors hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900"
            >
              Tüm Haberler →
            </a>
          </div>
        </div>
      </section>

      {/* FOTO GALERİ — Manşet altı şeridi */}
      <MmPhotoGallery />

      {/* HABER AKIŞI — Ana sayfada statik kartlar, detaylar için linkler */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="border-b-[3px] border-zinc-900 dark:border-zinc-100 pb-2 text-sm font-black uppercase tracking-[0.14em]">
            Güncel Haberler
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ul className="m-0 list-none divide-y divide-zinc-200 dark:divide-zinc-800 p-0">
                <li>
                  <article className="group py-8">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="h-56 w-full shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 md:h-44 md:w-72 rounded-lg shadow-sm">
                        <img
                          src="https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/823x463cc-amd-29-08-26-gulistan-doku-dosya-yeni-gelisme-350x250.jpeg"
                          alt="Nisêbîn"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000] mb-1">Güncel</span>
                        <h3 className="text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline sm:text-2xl transition-colors">
                          Nisêbîn'de bir kişi gözaltına alındı
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                          Hakkında yakalama kararı bulunduğu gerekçesiyle Rıdvan Aslan,
                          Nisêbîn ilçe merkezinde gözaltına alındı.
                        </p>
                        <a href="/malper/penc" className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#d90000] no-underline hover:underline inline-flex items-center gap-1">
                          Devamını Oku <span className="text-lg">→</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </li>

                <li>
                  <article className="group py-8">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="h-56 w-full shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 md:h-44 md:w-72 rounded-lg shadow-sm">
                        <img
                          src="https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/amd-29-08-2026-3genc-tahliye-350x250.jpeg"
                          alt="Gündem"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000] mb-1">Gündem</span>
                        <h3 className="text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline sm:text-2xl transition-colors">
                          Uyuşturucuya karşı çıktığı için tutuklanan 3 genç tahliye edildi
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                          Uyuşturucu ticaretine karşı çıktığı için tutuklanan 3 genç,
                          yargı sürecinin ardından tahliye edildi.
                        </p>
                        <a href="/malper/car" className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#d90000] no-underline hover:underline inline-flex items-center gap-1">
                          Devamını Oku <span className="text-lg">→</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              </ul>
            </div>

            {/* ÇOK OKUNAN — Sağ kolon */}
            <aside className="lg:col-span-4">
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow-sm">
                <div className="border-b-[3px] border-zinc-900 dark:border-zinc-100 bg-[#f8f8f8] dark:bg-zinc-800 px-5 py-4">
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-zinc-900 dark:text-zinc-100 m-0">
                    Çok Okunan Haberler
                  </h2>
                </div>

                <div className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  {[
                    { n: '01', t: "Kaya petrolü Amed'i kurutup zehirleyecek", h: '/malper/penc' },
                    { n: '02', t: 'Murat Karayılan: Savaş koşulları nedeniyle şahadetleri zamanında açıklayamadık', h: '/malper/car' },
                    { n: '03', t: 'IBAN üzerinden yatırım dolandırıcılığı', h: '/malper/rojname' },
                    { n: '04', t: 'Entelektüel tartışması, barış ve Öcalan meselesine dair…', h: '/malper/dirok' },
                  ].map((item) => (
                    <a key={item.n} href={item.h} className="group flex gap-4 p-5 no-underline transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      <span className="text-2xl font-black leading-none text-zinc-300 dark:text-zinc-700 group-hover:text-[#d90000] transition-colors">
                        {item.n}
                      </span>
                      <h3 className="text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#d90000] group-hover:underline transition-colors">
                        {item.t}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* VİDEO GALERİ */}
      <MmVideoGallery />

      {/* KATEGORİLER — 3'lü grid */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="border-b-[3px] border-zinc-900 dark:border-zinc-100 pb-2 text-sm font-black uppercase tracking-[0.14em] mb-8">
            Kategoriler
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { cat: 'Gündem', title: 'Günün Manşeti', href: '/malper/car', bg: 'bg-white' },
              { cat: 'Kadın & Jin', title: 'Jin Dergi & Kadın Haberleri', href: '/malper/rojname', bg: 'bg-white' },
              { cat: 'Kültür', title: 'Kültür & Sanat', href: '/malper/dirok', bg: 'bg-white' },
              { cat: 'Dünya', title: 'Dünya & Ortadoğu', href: '/malper/se', bg: 'bg-white' },
              { cat: 'Ekoloji', title: 'Çevre & Yaşam', href: '/malper/penc', bg: 'bg-white' },
              { cat: 'Emek', title: 'İşçi & Sendika', href: '/malper/yek', bg: 'bg-white' },
            ].map((k) => (
              <div key={k.cat} className={`flex min-h-[160px] flex-col justify-between ${k.bg} dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow`}>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d90000]">{k.cat}</span>
                  <h3 className="mt-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">{k.title}</h3>
                </div>
                <a
                  href={k.href}
                  className="mt-6 text-xs font-black uppercase tracking-[0.12em] text-zinc-900 dark:text-zinc-100 no-underline hover:text-[#d90000] hover:underline inline-flex items-center gap-1"
                >
                  Haberleri Gör <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YAZARLAR GRID */}
      <MmAuthorGrid />

      {/* FOOTER AYIRICI */}
      <div className="h-1.5 bg-[#d90000]" />
    </main>
  )
}

export default page
