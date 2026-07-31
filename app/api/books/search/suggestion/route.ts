import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { authors, books } from "@/lib/db/schema";
import { eq, ilike, or } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json([]);
    }

    const suggestions = await db
      .select({
        id: books.id,
        title: books.title,
        price: books.price,
        slug: books.slug,
        author: authors.name,
        coverImage: books.coverImage,
      })
      .from(books)
      .leftJoin(authors, eq(authors.id, books.authorId))
      .where(
        or(
          ilike(books.title, `%${query}%`),
          ilike(books.slug, `%${query}%`)
        )
      )
      .limit(8);


    return NextResponse.json(suggestions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}