export type BlogFilterCategory =
  | "Hotel"
  | "Travel"
  | "Luxury"
  | "Uncategorized"
  | "Catering"
  | "Delicious";

export type BlogFilterPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: BlogFilterCategory;
  image: string;
};
