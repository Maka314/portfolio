import { Suspense } from "react";
import type { Metadata } from "next";
import PostPageClient from "./PostPageClient";

export const metadata: Metadata = {
  title: "Post - Mingchen's Portfolio",
};

export default function PostPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500" />
        </div>
      }
    >
      <PostPageClient />
    </Suspense>
  );
}
