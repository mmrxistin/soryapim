// Bismillahirahmanirrahim
// Modern manşet slider'ı — otomatik dönen, ok/dot kontrollü, tam responsive
"use client";

import React, { useEffect, useRef, useState } from "react";

const mansetler = [
  {
    title: "Nisêbîn'de anma alanına ziyaretler sürüyor",
    desc: "Özgürlük mücadelesinde yaşamını yitiren gerillalar için kurulan anma alanı, üçüncü gününde yoğun ziyaretçi akışına ev sahipliği yapıyor.",
    img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/mrd-29-08-26-nisebin-taziye-ucuncu-gun23-750x375.jpg",
    href: "/malper/du",
    cat: "GÜNDEM",
  },
  {
    title: "Maden işçileri kazandı: Direnişimiz zaferle sonuçlandı",
    desc: "Maden işçilerinin direnişi zaferle sonuçlandı; işçiler kazanımlarını ilan etti.",
    img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/823x463cc-amd-29-08-26-gulistan-doku-dosya-yeni-gelisme-350x250.jpeg",
    href: "/malper/se",
    cat: "EKONOMİ",
  },
  {
    title: "Gîyadin'de siyanür süreci başladı!",
    desc: "Gîyadin'de altın madeninde siyanürle altın ayrıştırma süreci başladı; bölgede ekolojik tehdit her geçen gün büyüyor.",
    img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/690x390cc-mrk-28-08-2028-turk-sihasi-yunanitan-havaalanina-girdi-360x180.jpg",
    href: "/malper/penc",
    cat: "EKOLOJİ",
  },
  {
    title: "Uyuşturucuya karşı çıktığı için tutuklanan 3 genç tahliye edildi",
    desc: "Uyuşturucu ticaretine karşı çıktığı için tutuklanan 3 genç, yargı sürecinin ardından tahliye edildi.",
    img: "https://yeniyasamgazetesi9.com/wp-content/uploads/2026/08/amd-29-08-2026-3genc-tahliye-350x250.jpeg",
    href: "/malper/car",
    cat: "GÜNDEM",
  },
];

function MansetSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % mansetler.length), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const goto = (i: number) => {
    setIndex(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((v) => (v + 1) % mansetler.length), 6000);
  };

  const onceki = () => goto((index - 1 + mansetler.length) % mansetler.length);
  const sonraki = () => goto((index + 1) % mansetler.length);

  const item = mansetler[index];

  return (
    <div className="mm-ms-slider">
      <a href={item.href} className="mm-ms-slide mm-ms-active" aria-label={item.title}>
        <img src={item.img} alt={item.title} className="mm-ms-img" draggable={false} />
        <div className="mm-ms-grad" />

        <div className="mm-ms-tag">
          <span className="size-2 rounded-full bg-white animate-pulse" />
          MANŞET • {item.cat}
        </div>

        <div className="mm-ms-text">
          <h2 className="mm-ms-title">{item.title}</h2>
          <p className="mm-ms-desc">{item.desc}</p>
        </div>
      </a>

      {/* Oklar */}
      <button aria-label="Önceki haber" className="mm-ms-arrow mm-ms-prev" onClick={(e) => { e.preventDefault(); onceki(); }}>
        ‹
      </button>
      <button aria-label="Sonraki haber" className="mm-ms-arrow mm-ms-next" onClick={(e) => { e.preventDefault(); sonraki(); }}>
        ›
      </button>

      {/* Noktalar */}
      <div className="mm-ms-dots">
        {mansetler.map((_, i) => (
          <button
            key={i}
            aria-label={`Haber ${i + 1}`}
            onClick={(e) => { e.preventDefault(); goto(i); }}
            className={`mm-ms-dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MansetSlider;
