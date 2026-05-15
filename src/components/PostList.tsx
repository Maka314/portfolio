'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { WordPressPost } from '@/lib/wordpress';
import { fetchPosts } from '@/lib/wordpress';
import { formatDate, stripHtml } from '@/lib/utils';
import Spinner from '@/components/Spinner';

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
    return <Spinner />;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">Failed to load posts: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="py-20 text-center text-zinc-500">No posts yet.</div>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

        return (
          <Link
            key={post.id}
            href={`/post?slug=${post.slug}`}
            className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            {featuredImg && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={featuredImg}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            )}
            <div className="p-5">
              <h2
                className="mb-2 line-clamp-2 text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="mb-3 line-clamp-3 text-sm text-zinc-500 dark:text-zinc-400">
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
