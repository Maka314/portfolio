import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getPostData, getPostSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24 max-w-4xl mx-auto">
      <div className="w-full mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {frontmatter.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400">{frontmatter.date}</p>
      </div>

      <article className="prose prose-invert prose-lg w-full max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </main>
  );
}
