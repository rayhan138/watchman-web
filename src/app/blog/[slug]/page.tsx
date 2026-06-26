import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllPosts } from "@/utils/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found - Watchman",
    };
  }

  return {
    title: `${post.title} - Watchman Blog`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Generate static params at build time for SSG
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Spacer for fixed Navbar */}
        <div className="h-28 md:h-36"></div>

        {/* Article Container */}
        <article className="max-w-3xl mx-auto px-6 py-12 relative z-10">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
          
          <header className="relative z-10 mb-12 pb-8 border-b border-white/[0.06]">
            {/* Back to Blog */}
            <a
              href="/blog"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold mb-6 inline-flex items-center gap-2 group transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Blog
            </a>

            <div className="flex items-center gap-4 mb-4 text-xs text-neutral-500 font-mono">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span>&middot;</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="font-play font-bold text-4xl md:text-5xl tracking-tight leading-tight text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  {post.author.charAt(0)}
                </div>
                <span className="text-sm text-neutral-400">
                  By <strong className="text-white font-medium">{post.author}</strong>
                </span>
              </div>
            </div>
          </header>

          {/* Render Markdown Content HTML */}
          <section 
            className="watchman-blog-prose font-inter text-neutral-300 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />
        </article>
      </div>
      <Footer />
    </main>
  );
}
