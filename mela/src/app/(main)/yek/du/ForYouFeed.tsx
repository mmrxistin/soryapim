// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Essalatu vesselamu ala seyyidina muhammadin
// Subhanallahi ve bihamdihi
// Subhanallahil azim
// La ilahe illallah muhammadur resulullah
"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/yek/du/Post";
import PostsLoadingSkeleton from "@/components/yek/du/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { TefsirPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
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
          "/api/posts/Yek/tefsir",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<TefsirPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

// Subhanallahi ve bihamdihi

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
