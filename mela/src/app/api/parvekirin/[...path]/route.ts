import { GET as getYek } from "@/app/api/parvekirin/yek/route";
import { GET as searchYek } from "@/app/api/parvekirin/yek/search/route";
import { GET as getYekayeke } from "@/app/api/parvekirin/yek/yek/route";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const path = (await params).path.map((part) => part.toLowerCase()).join("/");

  if (path === "yek/search") return searchYek(req);
  if (path === "yek/yekayeke") return getYekayeke(req);
  if (path === "yek") return getYek(req);

  return Response.json({ error: "Not found" }, { status: 404 });
}