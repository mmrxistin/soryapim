"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { malperPageSchema } from "@/lib/validation/malper-page";

const slugSchema = z.string().trim().min(1).max(80).regex(/^[a-z0-9-]+$/);

async function requireAdmin() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/malper");
  }
}

export async function createMalperPage(formData: FormData) {
  await requireAdmin();

  const data = malperPageSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? "",
    content: formData.get("content"),
    layout: formData.get("layout") ?? "standard",
    published: formData.get("published") === "on",
  });

  const existing = await prisma.malperPage.findUnique({ where: { slug: data.slug } });
  if (existing) {
    throw new Error("Bu URL daha önce kullanılmıştır.");
  }

  await prisma.malperPage.create({ data });
  revalidatePath("/malper");
  revalidatePath("/admin/malper-sayfalari");
  redirect("/admin/malper-sayfalari");
}

export async function updateMalperPage(id: string, formData: FormData) {
  await requireAdmin();

  const data = malperPageSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? "",
    content: formData.get("content"),
    layout: formData.get("layout") ?? "standard",
    published: formData.get("published") === "on",
  });

  const existing = await prisma.malperPage.findUnique({ where: { slug: data.slug } });
  if (existing && existing.id !== id) {
    throw new Error("Bu URL daha önce kullanılmıştır.");
  }

  await prisma.malperPage.update({
    where: { id },
    data,
  });

  revalidatePath("/malper");
  revalidatePath("/malper/sayfa/[slug]");
  revalidatePath("/admin/malper-sayfalari");
  redirect("/admin/malper-sayfalari");
}

export async function deleteMalperPage(id: string) {
  await requireAdmin();
  await prisma.malperPage.delete({ where: { id } });
  revalidatePath("/malper");
  revalidatePath("/admin/malper-sayfalari");
}

export async function previewMalperSlug(formData: FormData) {
  await requireAdmin();
  const slug = slugSchema.safeParse(formData.get("slug"));
  return slug.success ? `/malper/sayfa/${slug.data}` : null;
}
