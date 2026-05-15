'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import type { WordPressPost } from '@/lib/wordpress';
import { fetchPostBySlug } from '@/lib/wordpress';
import { formatDate, stripHtml } from '@/lib/utils';
import BackButton from '@/components/BackButton';

function estimateReadingTime(html: string): number {
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

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

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    setShowBackToTop(scrollTop > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <span className="text-xl text-red-500">!</span>
        </div>
        <p className="text-sm text-red-500">{error}</p>
        <BackButton />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-zinc-500">Post not found.</p>
        <BackButton />
      </div>
    );
  }

  const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const readingTime = estimateReadingTime(post.content.rendered);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-zinc-800 transition-[width] duration-150 ease-out dark:bg-zinc-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top nav */}
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-8 py-6">
        <BackButton />
      </nav>

      <main className="px-8 pb-20">
        <article ref={articleRef} className="mx-auto max-w-3xl">
          {/* Article header */}
          <header className="mb-10">
            <h1
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-zinc-300 dark:text-zinc-700">&middot;</span>
              <span>{readingTime} min read</span>
            </div>
          </header>

          {/* Featured image */}
          {featuredImg && (
            <div className="-mx-4 mb-12 sm:mx-0">
              <div className="relative aspect-video overflow-hidden sm:rounded-xl">
                <Image src={featuredImg} alt="" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 to-transparent" />
              </div>
            </div>
          )}

          {/* Article content */}
          <div
            className="prose-custom prose prose-zinc max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Footer divider */}
          <hr className="mb-8 mt-16 border-zinc-200 dark:border-zinc-800" />

          <div className="flex items-center justify-between">
            <BackButton />
          </div>
        </article>
      </main>

      {/* Back to top */}
      {showBackToTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-shadow hover:text-zinc-800 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          aria-label="Back to top"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </motion.button>
      )}
    </>
  );
}

function Skeleton() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-8 py-6">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <main className="px-8 pb-20">
        <div className="mx-auto max-w-3xl animate-pulse">
          {/* Title skeleton */}
          <div className="mb-10 space-y-3">
            <div className="h-10 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-6 flex gap-3">
              <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
          {/* Image skeleton */}
          <div className="mb-12 aspect-video rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          {/* Content skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-zinc-200 dark:bg-zinc-800"
                style={{ width: `${85 - i * 3}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
