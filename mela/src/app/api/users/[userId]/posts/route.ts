// Bismillahirahmanirahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah 
// Allahumme salli ala seyyidina Muhammedin 
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illallah, Allahu Ekber, Allahu Ekber, ve lillahi'l-hamd
// Subhanallah, Elhamdulillah, Allahu Ekber




import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getYekInclude, YekPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.yek.findMany({
      where: { userId },
      include: getYekInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;
const data = {
       posts: posts.slice(0, pageSize).map((post: { content: any; }) => ({
         ...post,
         content: Array.isArray(post.content) ? post.content : [post.content]
       })),
       nextCursor,
     } as unknown as YekPage;
 

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
