// Bismillahirrahmanirahim
// Elhamdu lillahi rabbil alamin
// Esselatu vesselamu ala rasulillah 
// La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber


"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getDirokInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const post = await prisma.dirok.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.dirok.delete({
    where: { id },
    include: getDirokInclude(user.id),
  });

  return deletedPost;
}
