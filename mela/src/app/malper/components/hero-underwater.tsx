// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use client";

import { useEffect, useRef } from "react";

/**
 * Su altı 360° ajans sahnesi.
 * - Fare hareketiyle kameranın yönü (yaw/pitch) döner — 360° bakış.
 * - Balıklar, kabarcıklar ve ışık huzmeleri sürekli yüzer.
 */
export default function HeroUnderwaterScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const cx: CanvasRenderingContext2D = ctx;
    let raf = 0;
    let w = 0;
    let h = 0;

    function resize() {
      const parent = cv.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      cv.width = w;
      cv.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetYawRef.current = nx * Math.PI; // ±180°
      targetPitchRef.current = ny * (Math.PI / 4); // ±45°
    }
    window.addEventListener("mousemove", onMove);

    // ---- Dünya nesneleri ----
    type Fish = {
      x: number; y: number; z: number;
      size: number; speed: number; phase: number; hue: number;
    };
    const fishes: Fish[] = Array.from({ length: 14 }, (_, i) => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 1.6 - 0.8,
      z: 0.4 + Math.random() * 1.6,
      size: 14 + Math.random() * 26,
      speed: 0.0016 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      hue: 10 + i * 4,
    }));

    type Bubble = { x: number; y: number; z: number; r: number; speed: number; wob: number };
    const bubbles: Bubble[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: 0.3 + Math.random() * 1.7,
      r: 2 + Math.random() * 5,
      speed: 0.001 + Math.random() * 0.003,
      wob: Math.random() * Math.PI * 2,
    }));

    const motes = Array.from({ length: 60 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: 0.2 + Math.random() * 1.8,
      s: Math.random() * 2 + 0.6,
    }));

    function project(
      x: number, y: number, z: number,
      yaw: number, pitch: number,
    ): { sx: number; sy: number; depth: number } {
      // yaw (Y ekseni) döndür
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      let x1 = x * cy - z * sy;
      let z1 = x * sy + z * cy;
      // pitch (X ekseni) döndür
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      let y1 = y * cp - z1 * sp;
      let z2 = y * sp + z1 * cp;

      const focal = 1.1;
      const depth = Math.max(0.08, z2 + 1.6);
      const scale = focal / depth;
      return { sx: w / 2 + x1 * scale * (h * 0.9), sy: h / 2 + y1 * scale * (h * 0.9), depth: scale };
    }

    // ---- Merkez cihaz: ajansı temsil eden dönen modül ----
    const deviceEdges: [number, number, number][][] = (() => {
      // küp köşeleri
      const v: [number, number, number][] = [];
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1])
        v.push([sx * 0.09, sy * 0.09, sz * 0.09]);
      const edges: [number, number, number][][] = [];
      for (let i = 0; i < 8; i++)
        for (const j of [i ^ 1, i ^ 2, i ^ 4]) if (j > i) edges.push([v[i], v[j]]);
      return edges;
    })();

    const deviceSymbols: { ch: string; a: number; r: number; y0: number; sp: number }[] = [
      { ch: "▶", a: 0, r: 0.34, y0: -0.06, sp: 0.006 },
      { ch: "✎", a: 1.3, r: 0.38, y0: 0.08, sp: -0.005 },
      { ch: "◎", a: 2.6, r: 0.32, y0: -0.1, sp: 0.004 },
      { ch: "✦", a: 3.9, r: 0.4, y0: 0.05, sp: -0.007 },
      { ch: "◍", a: 5.1, r: 0.35, y0: -0.02, sp: 0.005 },
    ];

    function rot3(
      p: [number, number, number],
      ax: number, ay: number, az: number,
    ): [number, number, number] {
      let [x, y, z] = p;
      let c = Math.cos(ax), s = Math.sin(ax);
      [y, z] = [y * c - z * s, y * s + z * c];
      c = Math.cos(ay); s = Math.sin(ay);
      [x, z] = [x * c + z * s, -x * s + z * c];
      c = Math.cos(az); s = Math.sin(az);
      [x, y] = [x * c - y * s, x * s + y * c];
      return [x, y, z];
    }

    let t = 0;
    function frame() {
      t += 1;
      // yumuşak kamera takibi
      yawRef.current += (targetYawRef.current - yawRef.current) * 0.045;
      pitchRef.current += (targetPitchRef.current - pitchRef.current) * 0.045;
      const yaw = yawRef.current + Math.sin(t * 0.002) * 0.12; // hafif süzülme
      const pitch = pitchRef.current + Math.sin(t * 0.0015) * 0.06;

      // su arka planı — dikey gradyan
      const g = cx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#03212e");
      g.addColorStop(0.5, "#04283a");
      g.addColorStop(1, "#02141f");
      cx.fillStyle = g;
      cx.fillRect(0, 0, w, h);

      // ışık huzmeleri
      cx.save();
      cx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 4; i++) {
        const bx = w * (0.2 + i * 0.22) + Math.sin(t * 0.001 + i) * 40;
        const bg = cx.createLinearGradient(bx, 0, bx + 120, h);
        bg.addColorStop(0, "rgba(120,200,255,0.10)");
        bg.addColorStop(1, "rgba(120,200,255,0)");
        cx.fillStyle = bg;
        cx.beginPath();
        cx.moveTo(bx - 30, 0);
        cx.lineTo(bx + 60, 0);
        cx.lineTo(bx + 220, h);
        cx.lineTo(bx + 40, h);
        cx.closePath();
        cx.fill();
      }
      cx.restore();

      // ---- merkez cihaz ----
      const dc = project(0, 0.02, 0.5, yaw, pitch);
      const ds = dc.depth * h * 0.9;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.02);

      cx.save();
      cx.translate(dc.sx, dc.sy);
      cx.globalCompositeOperation = "lighter";

      // dış parlama
      const dg = cx.createRadialGradient(0, 0, 0, 0, 0, ds * 0.5);
      dg.addColorStop(0, `rgba(255,77,0,${0.14 + pulse * 0.1})`);
      dg.addColorStop(1, "rgba(255,77,0,0)");
      cx.fillStyle = dg;
      cx.beginPath();
      cx.arc(0, 0, ds * 0.5, 0, Math.PI * 2);
      cx.fill();

      // yörünge halkaları
      for (let ri = 0; ri < 3; ri++) {
        cx.save();
        cx.rotate(t * 0.0012 * (ri % 2 === 0 ? 1 : -1) + ri);
        cx.strokeStyle = ri === 1 ? "rgba(255,77,0,0.55)" : "rgba(140,210,255,0.35)";
        cx.lineWidth = 1.4;
        cx.beginPath();
        cx.ellipse(0, 0, ds * (0.3 + ri * 0.09), ds * (0.3 + ri * 0.09) * (0.3 + ri * 0.12), 0, 0, Math.PI * 2);
        cx.stroke();
        cx.restore();
      }

      // dönen tel küp iskeleti
      const ax = t * 0.004, ay = t * 0.0053, az = t * 0.0021;
      cx.strokeStyle = `rgba(200,235,255,${0.5 + pulse * 0.3})`;
      cx.lineWidth = 1.2;
      for (const [a, b] of deviceEdges) {
        const pa = rot3(a, ax, ay, az);
        const pb = rot3(b, ax, ay, az);
        const k = ds * 1.4;
        cx.beginPath();
        cx.moveTo(pa[0] * k, pa[1] * k);
        cx.lineTo(pb[0] * k, pb[1] * k);
        cx.stroke();
      }

      // çekirdek
      cx.fillStyle = `rgba(255,110,30,${0.7 + pulse * 0.3})`;
      cx.beginPath();
      cx.arc(0, 0, ds * (0.035 + pulse * 0.012), 0, Math.PI * 2);
      cx.fill();

      // yüzen ajans sembolleri
      cx.font = `${Math.max(12, ds * 0.09)}px system-ui`;
      cx.textAlign = "center";
      cx.textBaseline = "middle";
      for (const sym of deviceSymbols) {
        sym.a += sym.sp * 0.016;
        const sxp = Math.cos(sym.a) * sym.r;
        const szp = Math.sin(sym.a) * sym.r;
        const [rx, ry] = [sxp, sym.y0 + Math.sin(t * 0.008 + sym.a) * 0.03];
        // basit perspektif: arkadaysa küçült
        const persp = (szp + 0.6) / 1.2;
        cx.fillStyle = `rgba(255,140,60,${0.35 + persp * 0.5})`;
        cx.globalAlpha = 0.4 + persp * 0.6;
        cx.fillText(sym.ch, rx * ds, ry * ds);
        cx.globalAlpha = 1;
      }
      cx.restore();

      // süspansiyon parçacıkları
      for (const m of motes) {
        const p = project(m.x, m.y + Math.sin(t * 0.001 + m.x * 5) * 0.04, m.z, yaw, pitch);
        cx.fillStyle = "rgba(180,220,240,0.35)";
        cx.fillRect(p.sx, p.sy, m.s, m.s);
      }

      // balıklar — yönlü çizim, bakış yönüne göre yansır
      const dirSign = Math.cos(yaw) >= 0 ? 1 : -1;
      for (const f of fishes) {
        f.x += f.speed * dirSign;
        if (f.x > 1.3) f.x = -1.3;
        if (f.x < -1.3) f.x = 1.3;
        const yy = f.y + Math.sin(t * 0.01 + f.phase) * 0.06;
        const p = project(f.x, yy, f.z, yaw, pitch);
        const s = f.size * p.depth * 60;
        const flip = dirSign >= 0 ? 1 : -1;

        cx.save();
        cx.translate(p.sx, p.sy);
        cx.scale(flip, 1);
        // gövde
        cx.fillStyle = `hsla(${f.hue}, 85%, 55%, 0.9)`;
        cx.beginPath();
        cx.ellipse(0, 0, s, s * 0.42, 0, 0, Math.PI * 2);
        cx.fill();
        // kuyruk
        cx.beginPath();
        cx.moveTo(-s * 0.9, 0);
        cx.lineTo(-s * 1.5, -s * 0.35);
        cx.lineTo(-s * 1.5, s * 0.35);
        cx.closePath();
        cx.fill();
        // göz
        cx.fillStyle = "rgba(10,20,30,0.9)";
        cx.beginPath();
        cx.arc(s * 0.55, -s * 0.1, Math.max(1.5, s * 0.06), 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      }

      // kabarcıklar
      for (const b of bubbles) {
        b.y -= b.speed;
        b.wob += 0.02;
        if (b.y < -1.2) {
          b.y = 1.2;
          b.x = Math.random() * 2 - 1;
        }
        const p = project(b.x + Math.sin(b.wob) * 0.02, b.y, b.z, yaw, pitch);
        cx.strokeStyle = "rgba(190,230,255,0.5)";
        cx.lineWidth = 1;
        cx.beginPath();
        cx.arc(p.sx, p.sy, b.r * p.depth * 50, 0, Math.PI * 2);
        cx.stroke();
      }

      // vinyet
      const v = cx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,10,0.55)");
      cx.fillStyle = v;
      cx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
