export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string; protected: boolean };
  content: { rendered: string; protected: boolean };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details: { sizes: Record<string, { source_url: string }> };
    }>;
  };
}

const API_BASE = "https://cms.traveller314.com/wp-json/wp/v2";

export async function fetchPosts(): Promise<WordPressPost[]> {
  const res = await fetch(`${API_BASE}/posts?_embed&per_page=50`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPost> {
  const res = await fetch(
    `${API_BASE}/posts?_embed&slug=${encodeURIComponent(slug)}`
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  const posts: WordPressPost[] = await res.json();
  if (posts.length === 0) throw new Error(`Post not found: ${slug}`);
  return posts[0];
}