// Bismillahirrahmanirrahim
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala resulina Muhammedin 
// La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber

"use server"
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getYekInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: {
  content: string[];
  mediaIds: string[];
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await prisma.yek.create({
    data: {
      content, // DİZİ OLARAK GÖNDER
      userId: user.id,
      attachments: {
        connect: Array.isArray(mediaIds) ? mediaIds.map((id) => ({ id })) : [],
      },
    },
    include: getYekInclude(user.id),
  });

  return newPost;
}
