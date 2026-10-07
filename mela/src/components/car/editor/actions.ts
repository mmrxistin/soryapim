// Bismillahirrahmanirrahim
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala resulina Muhammedin 
// La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// LA İLAHE İLL ALLAH U VAHDEHU LA ŞERİKE LEH,LEHUL MULKU VE LEHUL HAMDU
// YUHYI VE YUMIT
// HUWE HAYYUN LA YEMUT
// BIYADIHIL XAYR
// HUWE U ALA KULLI ŞEYIN KADIR
// ALLAH U EKBER VELILLAHIL HAMD
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCarDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: {
  content: string[];
  mediaIds: string[];
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await prisma.car.create({
    data: {
      content, // Convert string[] to a single string
      userId: user.id,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getCarDataInclude(user.id),
  });

  return newPost;
}
