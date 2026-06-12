import { db } from "@/lib/db/db";
import { authors, books, categories, publishers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json(
        { message: "author id does not exist" },
        { status: 401 },
      );
    }

    const authorBooks = await db
      .select({
        id: books.id,
        title: books.title,
        price: books.price,
        coverImage: books.coverImage,
        averageRating: books.averageRating,
        category: categories.name,
        publisher: publishers.name,
        author: authors.name,
      })
      .from(books)
      .where(eq(books.authorId, id))
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(authors, eq(authors.id, books.authorId))

      .orderBy(desc(books.createdAt));

    return Response.json(authorBooks, { status: 200 });
  } catch (error) {
    console.log("author books not found", error);
    return Response.json(
      { message: "author books not found" },
      { status: 500 },
    );
  }
}