import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getContentInclude } from "@/lib/types";
import { NextRequest } from "next/server";

const contentModels = [
  prisma.yek,
  prisma.duyem,
  prisma.du,
  prisma.penc,
  prisma.yekayeke,
  prisma.tefsir,
  prisma.car,
  prisma.se,
  prisma.xane,
  prisma.rojname,
  prisma.dirok,
];

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q")?.trim() || "";
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!query) {
      return Response.json({ posts: [], nextCursor: null });
    }

    const searchQuery = query.split(/\s+/).join(" & ");
    const where = {
      OR: [
        { content: { has: query } },
        { user: { displayName: { search: searchQuery } } },
        { user: { username: { search: searchQuery } } },
      ],
    };

    const posts = (
      await Promise.all(
        contentModels.map((model) =>
          (model as any).findMany({
            where,
            include: getContentInclude(user.id),
            orderBy: { createdAt: "desc" },
            take: 10,
          }),
        ),
      )
    )
      .flat()
      .sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime())
      .slice(0, 10)
      .map((post) => ({
        ...post,
        content: Array.isArray(post.content) ? post.content : [post.content],
      }));

    return Response.json({ posts, nextCursor: null });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
