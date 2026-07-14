"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";
import blogFilterPosts from "../../data/blogFilterPosts";
import { BLOG_FILTER_OPTIONS } from "../../data/sections/blogFilters";

export default function BlogFilterGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("All Post");

  const visiblePosts = useMemo(() => {
    if (activeFilter === "All Post") {
      return blogFilterPosts;
    }
    return blogFilterPosts.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="flex flex-wrap justify-center gap-3">
          {BLOG_FILTER_OPTIONS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-2 text-sm transition ${
                  isActive
                    ? "bg-[#133c45] text-white"
                    : "border border-[#1f3c44]/15 bg-transparent text-[#1f3c44]/80 hover:border-[#1f3c44]/30"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {visiblePosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)] transition hover:shadow-[0_18px_48px_rgba(0,0,0,0.14)]"
            >
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[260px] bg-[#efeee9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized={post.image.startsWith("http")}
                  />
                </div>
                <div className="space-y-4 p-6">
                  <span className="inline-flex rounded-full border border-[#1f3c44]/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#c97a42]">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-2xl leading-snug md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#1f3c44]/70">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-[#1f3c44]/50">
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
