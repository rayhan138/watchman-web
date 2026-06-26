import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/utils/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Watchman",
  description: "Stay up to date with the latest product updates, guides, and privacy announcements from the Watchman team.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Spacer for fixed Navbar */}
        <div className="h-28 md:h-36"></div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-12 relative">
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left max-w-2xl">
            <h1 className="font-play font-bold text-5xl md:text-6xl tracking-tight mb-4 text-white">
              The Watchman Blog
            </h1>
            <p className="font-inter text-neutral-400 text-lg leading-relaxed">
              Guides, product releases, and thoughts on local-first networking, bandwidth optimization, and privacy.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
          {posts.length === 0 ? (
            <div className="text-center py-20 border border-white/[0.05] rounded-3xl bg-white/[0.01]">
              <p className="text-neutral-500 text-lg">No posts published yet. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/10 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Subtle top glow line */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="font-play font-bold text-2xl text-white group-hover:text-emerald-400 transition-colors mb-3 leading-tight">
                    {post.title}
                  </h2>

                  <p className="font-inter text-neutral-400 text-sm leading-relaxed mb-6">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.03]">
                    <span className="text-xs text-neutral-500">
                      By <strong className="text-neutral-400 font-medium">{post.author}</strong>
                    </span>
                    <span className="text-xs text-emerald-400 font-bold tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
                      Read Post <span className="text-sm">→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
