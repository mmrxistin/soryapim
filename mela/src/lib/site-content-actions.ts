// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function updateSiteContent(key: string, data: unknown) {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const allowed = ["stats", "cases", "services", "news", "clients"];
  if (!allowed.includes(key)) throw new Error("Invalid key");

  await prisma.siteContent.upsert({
    where: { key },
    update: { data: data as object },
    create: { key, data: data as object },
  });

  return { ok: true };
}
