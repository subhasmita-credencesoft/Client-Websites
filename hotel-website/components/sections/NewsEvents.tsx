import Link from "next/link";
import Container from "../ui/Container";
import { NEWS_EVENT_ARTICLES } from "@/data/sections/newsEvents";

export default function NewsEvents() {
  return (
   <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
       <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/30 text-[0.8rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
              06
            </span>
            <span>News & Events</span>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#1f3c44]/30 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:px-6 sm:text-xs sm:tracking-[0.2em]"
            >

            View all blog
          </Link>
        </div>
        <h2 className="mt-6 font-serif text-3xl sm:mt-8 sm:text-4xl md:text-6xl">
          Most recent articles
        </h2>

       <div className="mt-8 grid gap-6 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-8">
          {NEWS_EVENT_ARTICLES.map((article) => (
            <article
              key={article.title}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="grid gap-0 md:gap-6 lg:grid-cols-[1fr_1.2fr]">
                <div
                 className="h-56 w-full bg-cover bg-center sm:h-64 lg:h-full"
                  style={{ backgroundImage: `url(${article.image})` }}
                  role="img"
                  aria-label={article.title}
                />
             <div className="flex flex-col p-5 sm:p-6 lg:p-8">
                 <span className="inline-flex w-fit rounded-full border border-[#d9b38c] px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-[#d98a4a] sm:text-[0.6rem] sm:tracking-[0.3em]">
                    {article.category}
                  </span>
                  <h3 className="mt-4 font-serif text-[1.35rem] leading-tight sm:mt-5 sm:text-[1.6rem] lg:mt-6 lg:text-2xl">
                    {article.title}
                  </h3>
                <p className="mt-3 text-[0.92rem] text-[#1f3c44]/70 sm:mt-4 sm:text-sm">
                    {article.excerpt}
                  </p>
                 <div className="mt-5 border-t border-[#1f3c44]/10 pt-4 text-[0.68rem] uppercase tracking-[0.16em] text-[#1f3c44]/60 sm:mt-6 sm:text-xs sm:tracking-[0.3em]">
                    {article.date} · by {article.author}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
