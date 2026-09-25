// Bismillahirahmanirahim
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah
// La ilahe illAllahu vahdehu la sharika leh, lehu'l-mulku ve lehu'l-hamdu,
// yuhyi ve yumit
// bîyadîhîl xayr
//  ve huve ala kulli şey'in kadir
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illAllah, Allahu Ekber, Allahu Ekber ve lillahi'l-hamd
import React from "react";
import Mmmnavbar from "./components/mmnav";
import Footer from "./components/mmbingeh";
import ContactForm from "./components/mmfrm";
import MmLiveTv from "./components/mmlivetv";
import { YazarSlider } from "./components/mmslider";
import MmJinDergi from "./components/mmjin";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

// Editörün Seçtikleri — yeniyasamgazetesi9.com güncel içerik
const editorPicks = [
  { title: "Gülistan Doku'nun kaybolduğu saatlerde defalarca telefon görüşmesi ortaya çıktı", href: "/malper/yek" },
  { title: "Katledilmeden önce polise başvuran Sultan Kara'ya 'Bu ailede adam öldürecek tip yok' denildi", href: "/malper/rojname" },
  { title: "2 köyde 60 yıldır yol ve su yok: Siyasi tercihlerimizden dolayı cezalandırılıyoruz", href: "/malper/xane" },
  { title: "Amed sokaklarına şehitlerin posterleri asıldı", href: "/malper/car" },
  { title: "Avrupa'da kuraklık nehirleri kurutuyor", href: "/malper/penc" },
  { title: "Bir çağın içinden, bir barışın eşiğinde", href: "/malper/mmmmm" },
];

async function fetchWithTimeout(url: string, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getGununManseti(): Promise<{ img: string; href: string } | null> {
  try {
    const targetUrl = "https://yeniyasamgazetesi9.com/gunun-manseti/";
    const res = await fetchWithTimeout(targetUrl);
    if (!res.ok) return null;
    const html = await res.text();

    // URL'yi mutlak hale getiren yardımcı fonksiyon
    const makeAbsolute = (url: string) => {
      if (url.startsWith('http')) return url;
      return `https://yeniyasamgazetesi9.com${url.startsWith('/') ? '' : '/'}${url}`;
    };

    // 1. En güvenilir: Open Graph Image (og:image)
    const ogImg = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
    if (ogImg) return { img: makeAbsolute(ogImg[1]), href: targetUrl };

    // 2. Alternatif: 'attachment-large' veya 'attachment-full' sınıflı görseller
    const largeImgMatch = html.match(/src="([^"]+uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"[^>]+class="[^"]*attachment-(?:large|full|medium_large)/i);
    if (largeImgMatch) return { img: makeAbsolute(largeImgMatch[1]), href: targetUrl };

    // 3. Alternatif: Tarih bazlı klasör içindeki ilk büyük görsel
    const now = new Date();
    const ym = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
    const esc = ym.replace("/", "\\/");
    const re = new RegExp(`src="([^"]+uploads\/${esc}\/[^"]+\.(?:jpg|jpeg|png|webp))"`, "i");
    const match = html.match(re);
    if (match) return { img: makeAbsolute(match[1]), href: targetUrl };

    // 4. Son çare: Herhangi bir uploads görseli
    const fallback = html.match(/src="([^"]+uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/i);
    if (fallback) return { img: makeAbsolute(fallback[1]), href: targetUrl };

    return null;
  } catch (err) {
    return null;
  }
}

async function getKarikatur(): Promise<{ img: string; href: string; title: string } | null> {
  try {
    const res = await fetchWithTimeout("https://yeniyasamgazetesi9.com/");
    if (!res.ok) return null;
    const html = await res.text();

    const makeAbsolute = (url: string) => {
      if (url.startsWith('http')) return url;
      return `https://yeniyasamgazetesi9.com${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const match = html.match(/<h3[^>]*>\s*<span>KARİKATÜR<\/span>\s*<\/h3>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>\s*<img[^>]*src="([^"]+)"/i);
    if (match) {
      return { img: makeAbsolute(match[2]), href: makeAbsolute(match[1]), title: "Karikatür" };
    }

    const fallback = html.match(/src="([^"]+uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/i);
    if (fallback) {
      return { img: makeAbsolute(fallback[1]), href: "https://yeniyasamgazetesi9.com/karikatur/", title: "Karikatür" };
    }
    return null;
  } catch { return null; }
}

async function getJinDergiManset(): Promise<{ img: string; title: string; href: string } | null> {
  try {
    const res = await fetchWithTimeout("https://yeniyasamgazetesi9.com/");
    if (!res.ok) return null;
    const html = await res.text();

    const makeAbsolute = (url: string) => {
      if (url.startsWith('http')) return url;
      return `https://yeniyasamgazetesi9.com${url.startsWith('/') ? '' : '/'}${url}`;
    };

    // Yeni Yaşam Gazetesi üzerindeki JIN DERGİ kutusunu bul
    const match = html.match(
      /<h3[^>]*>\s*<span>JIN DERGİ<\/span>\s*<\/h3>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>\s*<img[^>]*src="([^"]+)"/i
    );

    if (match) {
      const captionMatch = html.match(/<span>JIN DERGİ<\/span>[\s\S]*?<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      const title = captionMatch ? `Jin Dergi — ${captionMatch[1].trim()}` : "Jin Dergi";

      return {
        img: makeAbsolute(match[2]),
        title: title,
        href: "https://jindergi.com"
      };
    }

    const fallbackRes = await fetchWithTimeout("https://jindergi.com/");
    if (fallbackRes.ok) {
      const fbHtml = await fallbackRes.text();
      const imgMatch = fbHtml.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
      const titleMatch = fbHtml.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
      if (imgMatch && titleMatch) {
        return {
          img: imgMatch[1],
          title: titleMatch[1],
          href: "https://jindergi.com"
        };
      }
    }

    return null;
  } catch { return null; }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const manset = await getGununManseti();
  const karikatur = await getKarikatur();
  const jinManset = await getJinDergiManset();
  const bugun = new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Mmmnavbar />
      <div className="mm-shell">
        <div className="mm-grid-frame mx-auto w-full">
          <main className="mm-main-col p-3 sm:p-4 md:p-5">
            {children}
          </main>
          <aside className="mm-tv-col p-2 sm:p-3 md:pt-5">
            <div className="mm-tv-panel">
              <div className="pt-5 mb-4">
                <YazarSlider />
              </div>
              <MmLiveTv />

              {/* GÜNÜN MANŞETİ — gazete kapağı */}
              <div className="mm-manset-box mt-2">
                <div className="mm-manset-head">GÜNÜN MANŞETİ</div>
                {manset ? (
                  <a href={manset.href} target="_blank" rel="noopener noreferrer" className="mm-manset-link">
                    <img src={manset.img} alt={`Günün Manşeti — ${bugun}`} className="mm-manset-img" />
                    <span className="mm-manset-date">{bugun}</span>
                  </a>
                ) : <div className="mm-manset-fallback">Gazete kapağı şu anda yüklenemedi.</div>}
              </div>

              <div className="mm-editor-pick">
                <div className="mm-editor-head"><span className="mm-editor-star">★</span> EDİTÖRÜN SEÇTİKLERİ</div>
                <div className="mm-editor-list">
                  {editorPicks.map((pick, i) => (
                    <a href={pick.href} key={i} className="mm-editor-item">
                      <span className="mm-editor-idx">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mm-editor-txt">{pick.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* JİN DERGİ — Sidebar Box */}
              <div className="mt-2">
                <MmJinDergi sidebar mansetData={jinManset} />
              </div>

              <div className="mm-karikatur-box">
                <div className="mm-karikatur-head">KARİKATÜR</div>
                {karikatur ? (
                  <a href={karikatur.href} target="_blank" rel="noopener noreferrer" className="mm-karikatur-link">
                    <img src={karikatur.img} alt={karikatur.title} className="mm-karikatur-img" />
                    <span className="mm-karikatur-caption">Günün karikatürü</span>
                  </a>
                ) : <div className="mm-karikatur-fallback">Karikatür şu anda yüklenemedi.</div>}
              </div>

              {/* E-GAZETE — Fill Gaps */}
              <div className="mm-tv-card p-6 bg-zinc-900 text-white text-center mt-2 border-none relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#d90000]"></div>
                <div className="text-[#d90000] text-[10px] font-black uppercase tracking-widest mb-1">Yeni Yaşam</div>
                <h2 className="text-2xl font-black italic tracking-tighter mb-2">e-gazete</h2>
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 bg-zinc-700"></div>
                </div>
                <p className="text-[11px] text-zinc-400 mb-6 leading-relaxed px-2">
                  Gazetemizin basılı nüshalarına dijital ortamda ulaşın. <br />
                  Arşiv ve günlük sayılar bir arada.
                </p>
                <a
                  href="/subscribe"
                  className="inline-block w-full py-3 bg-[#d90000] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded hover:bg-white hover:text-zinc-950 transition-all shadow-xl"
                >
                  HEMEN ABONE OL
                </a>
              </div>

              {/* SOSYAL MEDYA — Sidebar Footer */}
              <div className="flex justify-between items-center px-2 py-4 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Bizi Takip Edin</span>
                <div className="flex gap-3 text-zinc-400">
                  <a href="#" className="hover:text-[#d90000] transition-colors"><Facebook size={14} /></a>
                  <a href="#" className="hover:text-[#d90000] transition-colors"><Twitter size={14} /></a>
                  <a href="#" className="hover:text-[#d90000] transition-colors"><Instagram size={14} /></a>
                  <a href="#" className="hover:text-[#d90000] transition-colors"><Youtube size={14} /></a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </div>
  );
}
