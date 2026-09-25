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
  const bugun = new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Mmmnavbar />
      <div className="mm-shell">
        <div className="mm-grid-frame mx-auto w-full">
          <main className="mm-main-col p-0 sm:p-0 md:p-0">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
