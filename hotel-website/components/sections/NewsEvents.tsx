import Link from "next/link";
import Container from "../ui/Container";

const articles = [
  {
    title: "These are the top 7 luxury hotels in the world",
    category: "Catering",
    date: "November 5, 2024",
    author: "Admin",
    excerpt:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/blog_15.jpg",
  },
  {
    title: "Four Seasons, Milan: luxury in Italy's most stylish city",
    category: "Delicious",
    date: "November 5, 2024",
    author: "Admin",
    excerpt:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_blog2.jpg",
  },
];

export default function NewsEvents() {
  return (
    <section className="bg-[#f3efe8] py-20 text-[#1f3c44]">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em]">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/30 text-sm font-semibold">
              06
            </span>
            <span>News & Events</span>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#1f3c44]/30 px-6 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            View all blog
          </Link>
        </div>
        <h2 className="mt-8 font-serif text-4xl md:text-6xl">
          Most recent articles
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.title}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                <div
                  className="h-64 w-full bg-cover bg-center lg:h-full"
                  style={{ backgroundImage: `url(${article.image})` }}
                  role="img"
                  aria-label={article.title}
                />
                <div className="flex flex-col p-8">
                  <span className="inline-flex w-fit rounded-full border border-[#d9b38c] px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-[#d98a4a]">
                    {article.category}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl leading-tight">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm text-[#1f3c44]/70">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 border-t border-[#1f3c44]/10 pt-4 text-xs uppercase tracking-[0.3em] text-[#1f3c44]/60">
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
