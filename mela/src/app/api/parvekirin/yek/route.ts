// Bismillahirahmanirahim
// Elhamdullillahirabbulalemin
//Es-selatu vesselamu ala rasulina Muhammedin 
// Subhanallahi ve bihamdihi
// Subhanallahil azim
// La ilahe illallah muhammadur resulullah


import prisma from "@/lib/prisma";
import { getYekInclude, YekPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

   

    const posts = await prisma.yek.findMany({
      include: getYekInclude(""),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    } as unknown as YekPage;

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
