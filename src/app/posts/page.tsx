import type { Metadata } from "next";
import PostList from "@/components/PostList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts - Mingchen's Portfolio",
  description: "Read Mingchen's blog posts",
};

export default function PostsPage() {
  return (
    <>
      <nav className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Home
        </Link>
      </nav>
      <main className="px-8 pb-20">
        <h1 className="text-3xl font-medium text-center mb-12">Posts</h1>
        <PostList />
      </main>
    </>
  );
}
