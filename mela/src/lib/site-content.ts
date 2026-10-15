// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

import prisma from "@/lib/prisma";
import { STATS, CASES, SERVICES, NEWS, CLIENTS } from "@/app/malper/ajans-veri";

// Veritabanında kayıt yoksa bu varsayılanlar (ajans-veri.ts) kullanılır.
export const DEFAULT_SITE_CONTENT: Record<string, unknown> = {
  stats: STATS,
  cases: CASES,
  services: SERVICES,
  news: NEWS,
  clients: CLIENTS,
};

export async function getSiteContent(): Promise<Record<string, unknown>> {
  try {
    const rows = await prisma.siteContent.findMany();
    const stored: Record<string, unknown> = {};
    for (const row of rows) stored[row.key] = row.data;
    return { ...DEFAULT_SITE_CONTENT, ...stored };
  } catch {
    // Veritabanı hatasında site yine de açılsın
    return DEFAULT_SITE_CONTENT;
  }
}
