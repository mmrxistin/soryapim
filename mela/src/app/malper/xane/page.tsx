// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Ve salatu ve selamu ala resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Estağfirullah El-Azim
// Allah u Ekber Ve Lillahil Hamd
"use client";
import React from "react";
import Xane from "./ForYouFeed";

function page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b-4 border-[#bb1919] pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#bb1919]">
            Kategori
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">Ekoloji</h1>
          <p className="mt-1 text-gray-600">Ekoloji ve çevre haberleri</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8 rounded-lg bg-white p-6 shadow-sm">
            <Xane />
          </section>

          <aside className="lg:col-span-4">
            <div className="border-t-4 border-[#bb1919] bg-white p-6 shadow-sm">
              <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-black">Kategoriler</h2>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="/malper/car" className="hover:text-[#bb1919]">Gündem</a></li>
                <li><a href="/malper/se" className="hover:text-[#bb1919]">Dünya</a></li>
                <li><a href="/malper/dirok" className="hover:text-[#bb1919]">Ekonomi</a></li>
                <li><a href="/malper/xane" className="text-[#bb1919] hover:underline">Ekoloji</a></li>
                <li><a href="/malper/rojname" className="hover:text-[#bb1919]">Kadın</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
      {/* Alert ve ForYouFeed Alt Kısma Taşındı */}
    </div>
  );
}

export default page;
//ELHAMDULILLAH ELHAMDULILLAH ELHAMDULILLAH
//ELHAMDULILLAHIRABBILALEMIN


// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir