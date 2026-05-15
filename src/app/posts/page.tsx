import type { Metadata } from 'next';
import PostList from '@/components/PostList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Posts - Mingchen's Portfolio",
  description: "Read Mingchen's blog posts",
};

export default function PostsPage() {
  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          &larr; Home
        </Link>
      </nav>
      <main className="px-8 pb-20">
        <h1 className="mb-12 text-center text-3xl font-medium">Posts</h1>
        <PostList />
      </main>
    </>
  );
}
