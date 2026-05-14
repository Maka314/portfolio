import { fetchPosts } from "@/lib/wordpress";
import PostContent from "./PostContent";

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostContent slug={slug} />;
}
