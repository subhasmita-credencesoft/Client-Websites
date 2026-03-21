export type NewsEventArticle = {
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
};

export const NEWS_EVENT_ARTICLES: NewsEventArticle[] = [
  {
    title: "These are the top 7 luxury hotels in the world",
    category: "Catering",
    date: "November 5, 2024",
    author: "Admin",
    excerpt:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    image: "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/blog_15.jpg",
  },
  {
    title: "Four Seasons, Milan: luxury in Italy's most stylish city",
    category: "Delicious",
    date: "November 5, 2024",
    author: "Admin",
    excerpt:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    image: "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_blog2.jpg",
  },
];
