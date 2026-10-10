// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getseInclude, sePage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.se.findMany({
      include: getseInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: sePage = {
      items: posts.slice(0, pageSize).map((post) => ({
        ...post,
        content: Array.isArray(post.content) ? post.content : [post.content],
      })),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
