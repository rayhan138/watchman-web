import { marked } from "marked";
import { postsData } from "./postsData";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  category: string;
  contentHtml?: string;
}

export function getAllPosts(): BlogPost[] {
  return postsData
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      author: post.author,
      category: post.category,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = postsData.find((p) => p.slug === slug);
  if (!post) {
    return null;
  }

  // Compile markdown to safe HTML using marked
  const contentHtml = await marked.parse(post.content);

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    author: post.author,
    category: post.category,
    contentHtml,
  };
}
