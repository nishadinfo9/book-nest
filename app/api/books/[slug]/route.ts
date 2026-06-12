import { db } from "@/lib/db/db";
import { authors, books, categories, publishers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Bokor } from "next/font/google";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const book = await db
      .select({
        id: books.id,
        title: books.title,
        price: books.price,
        coverImage: books.coverImage,
        averageRating: books.averageRating,
        status: books.status,
        reviewCount: books.reviewCount,
        description: books.description,
        language: books.language,
        category: categories.name,
        publisher: publishers.name,
        author: authors.name,
      })
      .from(books)
      .where(eq(books.slug, slug))
      .limit(1)
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(authors, eq(authors.id, books.authorId));

    if (!book.length) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json({
      data: book[0],
    });
  } catch (error) {
    console.error("Book not found:", error);
    return Response.json({ error: "Book not found" }, { status: 404 });
  }
}
