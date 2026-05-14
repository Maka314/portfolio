"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { WordPressPost } from "@/lib/wordpress";
import { fetchPosts } from "@/lib/wordpress";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export default function PostList() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load posts: {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="text-center py-20 text-zinc-500">No posts yet.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {posts.map((post) => {
        const featuredImg =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        return (
          <Link
            key={post.id}
            href={`/post?slug=${post.slug}`}
            className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            {featuredImg && (
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={featuredImg}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
            )}
            <div className="p-5">
              <h2
                className="text-lg font-semibold mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-3">
                {stripHtml(post.excerpt.rendered)}
              </p>
              <time className="text-xs text-zinc-400 dark:text-zinc-500">
                {formatDate(post.date)}
              </time>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
