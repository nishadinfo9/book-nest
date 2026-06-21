import { db } from "@/lib/db/db";
import { authors, books, categories, publishers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const book = await db
      .select({
        id: books.id,
        title: books.title,
        price: books.price,
        isbn13: books.isbn13,
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
      .where(eq(books.id, id))
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
