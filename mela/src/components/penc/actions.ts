// Bismillahirrahmanirahim
// Elhamdu lillahi rabbil alamin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe illallah,Muhammeden abduhu ve resuluhu
// Subhanallah, Elhamdulillah, Allahu Ekber

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPencInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const post = await prisma.penc.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.penc.delete({
    where: { id },
    include: getPencInclude(user.id),
  });

  return deletedPost;
}
