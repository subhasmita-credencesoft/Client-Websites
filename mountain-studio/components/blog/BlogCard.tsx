"use client";

import Link from "next/link";
import { Clock, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[28px] border border-gold/10 bg-dark-2 transition duration-500 hover:-translate-y-1 hover:border-gold/25 ${
        featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[400px]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-gold/25 bg-dark/65 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-gold-light backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className={`space-y-4 p-6 ${featured ? "lg:p-8 lg:flex lg:flex-col lg:justify-center" : ""}`}>
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2
            className={`font-display text-ivory transition group-hover:text-gold ${
              featured ? "text-3xl lg:text-4xl" : "text-2xl"
            }`}
          >
            {post.title}
          </h2>
        </Link>

        <p className="text-sm leading-7 text-ivory/60 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          <Tag size={12} className="text-ivory/30" />
          {post.secondaryKeywords.slice(0, 3).map((kw) => (
            <span key={kw} className="rounded-full bg-dark-3 px-2.5 py-0.5 text-[10px] text-ivory/45">
              {kw}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-gold transition hover:text-gold-light"
        >
          Read More
          <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
