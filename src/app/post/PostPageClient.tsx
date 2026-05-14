"use client";

import { useSearchParams } from "next/navigation";
import PostContent from "@/components/PostContent";

export default function PostPageClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-zinc-500">No post specified.</p>
        <a
          href="/posts"
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Back to Posts
        </a>
      </div>
    );
  }

  return <PostContent slug={slug} />;
}
