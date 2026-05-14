"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { WordPressPost } from "@/lib/wordpress";
import { fetchPostBySlug } from "@/lib/wordpress";
import { formatDate, stripHtml } from "@/lib/utils";
import BackButton from "@/components/BackButton";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <p className="text-red-500 text-sm">{error}</p>
        <BackButton />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-zinc-500">Post not found.</p>
        <BackButton />
      </div>
    );
  }

  const featuredImg =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const readingTime = estimateReadingTime(post.content.rendered);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-zinc-800 dark:bg-zinc-200 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top nav */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-3xl mx-auto">
        <BackButton />
      </nav>

      <main className="px-8 pb-20">
        <article ref={articleRef} className="max-w-3xl mx-auto">
          {/* Article header */}
          <header className="mb-10">
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-tight"
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
            <div className="mb-12 -mx-4 sm:mx-0">
              <div className="relative aspect-video sm:rounded-xl overflow-hidden">
                <Image
                  src={featuredImg}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 to-transparent" />
              </div>
            </div>
          )}

          {/* Article content */}
          <div
            className="prose-custom prose prose-zinc dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Footer divider */}
          <hr className="mt-16 mb-8 border-zinc-200 dark:border-zinc-800" />

          <div className="flex justify-between items-center">
            <BackButton />
          </div>
        </article>
      </main>

      {/* Back to top */}
      {showBackToTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          aria-label="Back to top"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </motion.button>
      )}
    </>
  );
}

function Skeleton() {
  return (
    <>
      <div className="px-8 py-6 max-w-3xl mx-auto">
        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
      <main className="px-8 pb-20">
        <div className="max-w-3xl mx-auto animate-pulse">
          {/* Title skeleton */}
          <div className="mb-10 space-y-3">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full" />
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-3/4" />
            <div className="flex gap-3 mt-6">
              <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>
          {/* Image skeleton */}
          <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-12" />
          {/* Content skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"
                style={{ width: `${85 - i * 3}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
