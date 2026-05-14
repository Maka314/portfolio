"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import type { WordPressPost } from "@/lib/wordpress";
import { fetchPostBySlug } from "@/lib/wordpress";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPostBySlug(slug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Failed to load post: {error}</p>
        <Link
          href="/posts"
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Back to Posts
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 mb-4">Post not found.</p>
        <Link
          href="/posts"
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Back to Posts
        </Link>
      </div>
    );
  }

  const featuredImg =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-6 max-w-3xl mx-auto">
        <Link
          href="/posts"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Back to Posts
        </Link>
      </nav>
      <main className="px-8 pb-20">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1
              className="text-3xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <time className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatDate(post.date)}
            </time>
          </header>
          {featuredImg && (
            <img
              src={featuredImg}
              alt=""
              className="w-full rounded-xl mb-8"
            />
          )}
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
    </>
  );
}
