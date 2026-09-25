// Bismillahir Rahmanir Rahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin ve ala alihi ve sahbihi ecmain
// La ilahe illallah, Muhammedur Resulullah
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber


export default function PostsLoadingSkeleton() {
  return (
    <div className="space-y-7">
      <div className="mm-loader-bar" />
      {[0, 1, 2].map((i) => (
        <PostLoadingSkeleton key={i} index={i} />
      ))}
      <div className="mm-loader-label">
        <span className="mm-dot" />
        <span className="mm-dot" style={{ animationDelay: "0.15s" }} />
        <span className="mm-dot" style={{ animationDelay: "0.3s" }} />
        <span className="mm-loader-text">Haberler yükleniyor…</span>
      </div>
    </div>
  );
}

function PostLoadingSkeleton({ index }: { index: number }) {
  return (
    <div
      className="mm-skel mm-card-lift w-full rounded-lg bg-white p-6 shadow-sm space-y-4"
      style={{ animationDelay: `${0.12 * index}s` }}
    >
      {/* Kategori rozeti + tarih */}
      <div className="flex items-center justify-between">
        <div className="mm-shimmer mm-shimmer-badge" />
        <div className="mm-shimmer h-3 w-16" />
      </div>
      {/* Başlık */}
      <div className="mm-shimmer mm-shimmer-line" style={{ width: "78%", height: "1.35rem" }} />
      {/* Görsel alanı */}
      <div className="mm-shimmer mm-shimmer-img h-44 w-full" />
      {/* İçerik paragrafları */}
      <div className="mm-shimmer mm-shimmer-line" style={{ width: "100%" }} />
      <div className="mm-shimmer mm-shimmer-line" style={{ width: "84%" }} />
      <div className="mm-shimmer mm-shimmer-line" style={{ width: "58%" }} />
      {/* Alt kısım: avatar ve yazar */}
      <div className="flex items-center gap-3 pt-2">
        <div className="mm-shimmer size-10 rounded-full" />
        <div className="space-y-1.5">
          <div className="mm-shimmer h-3.5 w-28" />
          <div className="mm-shimmer h-3 w-20" />
        </div>
      </div>
    </div>
  );
}
