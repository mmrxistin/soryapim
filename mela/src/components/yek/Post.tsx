// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala rasulina Muhammedin 
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammeden abduhu ve rasuluhu
// Allah U Ekber ve lillahi'l-hamd

"use client";

import { YekData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Media } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Linkify from "../Linkify";
import UserAvatar from "../UserAvatar";


interface PostProps {
  post: YekData;
}

export default function Post({ post }: PostProps) {




  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm text-black">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <div>
          </div>
        </div>
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">
          {post.content[0]}
        </div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <Link
            href={`/malper/Yek/posts/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
            suppressHydrationWarning
          >
            Daha fazla oku
          </Link>
        </div>
      </div>
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <div key={m.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
          <MediaPreview media={m} />
        </div>
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={1200}
        height={900}
        className="h-[18rem] w-full object-contain sm:h-[22rem]"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Ev medya nabe</p>;
}



