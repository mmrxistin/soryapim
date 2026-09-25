// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah, Muhammedur Resulullah
// Allah U Ekber ve lillahi'l-hamd
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Rojnm from "./ForYouFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b-4 border-[#bb1919] pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#bb1919]">
            Kategori
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">Kadın</h1>
          <p className="mt-1 text-gray-600">Kadın gündemi, aile, sağlık, kariyer ve yaşam üzerine haberler ve köşe yazıları</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="rounded-lg bg-white p-6 shadow-sm lg:col-span-8">
            <Rojnm />
          </section>

          <aside className="lg:col-span-4">
            <div className="border-t-4 border-[#bb1919] bg-white p-6 shadow-sm">
              <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-black">Kategoriler</h2>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="/malper/car" className="hover:text-[#bb1919]">Gündem</a></li>
                <li><a href="/malper/se" className="hover:text-[#bb1919]">Dünya</a></li>
                <li><a href="/malper/dirok" className="hover:text-[#bb1919]">Ekonomi</a></li>
                <li><a href="/malper/xane" className="hover:text-[#bb1919]">Ekoloji</a></li>
                <li><a href="/malper/rojname" className="text-[#bb1919] hover:underline">Kadın</a></li>
                <li><a href="/malper/penc" className="hover:text-[#bb1919]">Teknoloji</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir