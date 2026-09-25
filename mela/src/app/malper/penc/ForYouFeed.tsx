// Bismillahirrahmanirrahim 
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// La ilahe illAllah, Muhammedur Resulullah
// SuphanAllah velhamdulillah, Allahu Ekber
// Allah u Ekber Ve Lillahil Hamd
"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/se/Post";
import PostsLoadingSkeleton from "@/components/yek/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PencPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Penc() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/mmkargeh",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PencPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

 const posts = data?.pages.flatMap((page) => {
    if ("items" in page && Array.isArray((page as any).items)) return (page as any).items;
    if ("posts" in page && Array.isArray((page as any).posts)) return (page as any).posts;
    return [];
  }) || [];
  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        Hê kesî tiştek parvenekirî ye
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        Pirsgirek derket 
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir