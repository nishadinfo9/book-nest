import { sql } from "drizzle-orm";
import {
  authors,
  books,
  categories,
  publishers,
  wishlists,
} from "@/lib/db/schema";

export const baseBookSelection = {
  id: books.id,
  slug: books.slug,
  title: books.title,
  price: books.price,
  discountPrice: books.discountPrice,
  coverImage: books.coverImage,
  averageRating: books.averageRating,
  reviewCount: books.reviewCount,
  category: categories.name,
  publisher: publishers.name,
  author: authors.name,
};

export const bookCardSelection = {
  ...baseBookSelection,
  wishlisted: sql<boolean>`${wishlists.id} IS NOT NULL`,
};