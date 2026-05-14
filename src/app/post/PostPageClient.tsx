"use client";

import { useSearchParams } from "next/navigation";
import PostContent from "@/components/PostContent";
import BackButton from "@/components/BackButton";

export default function PostPageClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-zinc-500">No post specified.</p>
        <BackButton />
      </div>
    );
  }

  return <PostContent slug={slug} />;
}
