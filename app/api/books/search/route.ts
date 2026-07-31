import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { eq, ilike, or, desc, sql } from "drizzle-orm";
import { authors, books, categories, publishers, wishlists } from "@/lib/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log('searchParams', searchParams)

    const query = searchParams.get("q")?.trim() || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 12);

    console.log('query', query)

    const offset = (page - 1) * limit;

    if (!query) {
      return NextResponse.json({
        books: [],
        pagination: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      });
    }

    const whereCondition = or(
      ilike(books.title, `%${query}%`),
      ilike(books.description, `%${query}%`),
      ilike(authors.name, `%${query}%`)
    );

    const results = await db
      .select({
       id: books.id,
              slug: books.slug,
              title: books.title,
              price: books.price,
              coverImage: books.coverImage,
              averageRating: books.averageRating,
              category: categories.name,
              publisher: publishers.name,
              author: authors.name,
              wishlisted: sql<boolean>`${wishlists.id} IS NOT NULL`,
      })
      .from(books)
      .leftJoin(authors, eq(books.authorId, authors.id))
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(wishlists, eq(wishlists.bookId, books.id))
      .where(whereCondition)
      .orderBy(desc(books.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(books)
      .leftJoin(authors, eq(books.authorId, authors.id))
      .where(whereCondition);

      console.log('results', results)

    return NextResponse.json(
      // {
     results
      // pagination: {
      //   total: Number(count),
      //   page,
      //   limit,
      //   totalPages: Math.ceil(Number(count) / limit),
      // },
    // }
  );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}