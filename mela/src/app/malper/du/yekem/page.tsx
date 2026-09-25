// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Ve salatu ve selamu ala resulina Muhammedin ve alihi ve sahbihi ecmain
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// Estağfirullah El-Azim

"use client";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 py-10">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
        <span className="text-xs font-black uppercase tracking-wider text-[#bb1919]">
          Sağlık
        </span>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Sporcu Beslenmesi
        </h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
          <p>
            Sporcularda beslenme, performansın artırılması, toparlanma
            sürecinin hızlandırılması ve genel sağlığın korunması açısından
            kritik bir rol oynamaktadır. Son dönem araştırmalar, beslenmenin
            sadece enerji alımı değil, aynı zamanda antrenman adaptasyonu,
            bağışıklık sistemi desteği ve zihinsel dayanıklılık üzerinde de
            etkili olduğunu göstermektedir.
          </p>
          <h2 className="text-xl font-black text-gray-900">Makro ve Mikro Besinlerin Önemi</h2>
          <p>
            Sporcuların enerji ve protein ihtiyaçları, sedanter bireylere göre
            daha fazladır. Bu nedenle karbonhidrat, protein ve yağ gibi makro
            besin ögelerinin dengeli alımı önemlidir. Ayrıca, vitamin ve
            mineral gibi mikro besin ögeleri de performans ve toparlanma
            süreçlerinde kritik rol oynar.
          </p>
          <h2 className="text-xl font-black text-gray-900">Sonuç</h2>
          <p>
            Sporcularda beslenme, sadece fiziksel performansı değil, aynı
            zamanda genel sağlığı, zihinsel dayanıklılığı ve uzun vadeli
            başarıyı etkileyen temel bir faktördür.
          </p>
        </div>
      </article>
      {/* Alert ve ForYouFeed Alt Kısma Taşındı */}
    </div>
  );
}

export default page;