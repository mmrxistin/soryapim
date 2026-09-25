// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
import Linkify from "@/components/Linkify";
import MmmPost from "@/components/yek/mmPost";
import Post from "@/components/yek/mmPost";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import prisma from "@/lib/prisma";
import { getYekInclude, UserData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

interface PageProps {
  params: { postId: string };
}

const getPost = cache(async (postId: string) => {
  const post = await prisma.yek.findUnique({
    where: {
      id: postId,
    },
    include: getYekInclude(""), // Kullanıcı doğrulama kaldırıldı
  });

  if (!post) notFound();

  return post;
});


export default async function Page({ params: { postId } }: PageProps) {
  const post = await getPost(postId);

  return (
    <main
      className="flex w-full min-h-screen flex-col bg-[#f8f9fa] p-4 lg:flex-row"
    >
      {/* İçerik Kartı */}
      <div className="flex flex-1 items-start justify-center">
        <div className="w-full max-w-2xl">
          <MmmPost post={post} />
          {/* Ayraç ve boşluk */}
          <div className="my-8">
            <hr className="border-t-4 border-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}

interface UserInfoSidebarProps {
  user: UserData;
}













