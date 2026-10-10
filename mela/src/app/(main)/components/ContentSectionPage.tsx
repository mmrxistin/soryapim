"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import DuPostEditor from "@/components/du/editor/PostEditor";
import DuPost from "@/components/du/Post";
import PostsLoadingSkeleton from "@/components/xane/PostsLoadingSkeleton";
import XanePostEditor from "@/components/xane/editor/PostEditor";
import XanePost from "@/components/xane/Post";
import YekPostEditor from "@/components/yek/editor/PostEditor";
import YekPost from "@/components/yek/Post";
import kyInstance from "@/lib/ky";
import { XanePage, YekPage, duPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface ContentSectionPageProps {
  title: string;
  apiPath: string;
  postType: "xane" | "yek" | "du";
}

export default function ContentSectionPage({
  title,
  apiPath,
  postType,
}: ContentSectionPageProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["content-section", apiPath],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(apiPath, pageParam ? { searchParams: { cursor: pageParam } } : {})
          .json<XanePage | YekPage | duPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const posts = data?.pages.flatMap((page) => {
    if ("items" in page && Array.isArray(page.items)) return page.items;
    if ("posts" in page && Array.isArray(page.posts)) return page.posts;
    return [];
  }) ?? [];

  const renderPost = (post: XanePage["items"][number] | YekPage["posts"][number] | duPage["items"][number]) => {
    if (postType === "xane") return <XanePost key={post.id} post={post as any} />;
    if (postType === "yek") return <YekPost key={post.id} post={post as any} />;
    return <DuPost key={post.id} post={post as any} />;
  };

  const renderEditor = () => {
    if (postType === "xane") return <XanePostEditor />;
    if (postType === "yek") return <YekPostEditor />;
    return <DuPostEditor />;
  };

  if (status === "pending") {
    return (
      <section className="space-y-6 p-4 sm:p-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">
            İçerik Yönetimi
          </p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
        </header>
        <PostsLoadingSkeleton />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="p-6 text-center text-destructive">
        {title} içerikleri yüklenemedi.
      </section>
    );
  }

  return (
    <section className="space-y-6 p-4 sm:p-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">
            İçerik Yönetimi
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {posts.length} içerik
        </span>
      </header>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {renderEditor()}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          Henüz {title} içeriği bulunmuyor.
        </div>
      ) : (
        <InfiniteScrollContainer
          className="space-y-5"
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
          {posts.map(renderPost)}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-red-600" />
            </div>
          )}
        </InfiniteScrollContainer>
      )}
    </section>
  );
}
