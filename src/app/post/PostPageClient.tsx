"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PostContent from "@/components/PostContent";

export default function PostPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-zinc-500">No post specified.</p>
        <button
          onClick={goBack}
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Go back
        </button>
      </div>
    );
  }

  return <PostContent slug={slug} />;
}
