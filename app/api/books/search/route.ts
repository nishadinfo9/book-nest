import { desc, eq, ilike, or, sql } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { books, authors, categories, publishers } from '@/lib/db/schema';
import { redis } from '@/lib/db/redis';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q')?.trim() ?? '';

    const page = Math.max(1, Number(searchParams.get('page')) || 1);

    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get('limit')) || 10),
    );

    if (!query) {
      return Response.json(
        {
          success: false,
          message: 'Search query is required.',
        },
        {
          status: 400,
        },
      );
    }

    const offset = (page - 1) * limit;

    const cacheKey = `books:search:${query.toLowerCase()}:page:${page}:limit:${limit}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
      return Response.json(JSON.parse(cached));
    }

    const whereCondition = or(
      ilike(books.title, `%${query}%`),
      ilike(authors.name, `%${query}%`),
      ilike(categories.name, `%${query}%`),
      ilike(publishers.name, `%${query}%`),
    );

    const data = await db
      .select({
        id: books.id,
        slug: books.slug,
        title: books.title,
        price: books.price,
        coverImage: books.coverImage,
        averageRating: books.averageRating,
        author: authors.name,
        category: categories.name,
        publisher: publishers.name,
      })
      .from(books)
      .leftJoin(authors, eq(authors.id, books.authorId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .where(whereCondition)
      .orderBy(desc(books.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(books)
      .leftJoin(authors, eq(authors.id, books.authorId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .where(whereCondition);

    const response = {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
      },
    };

    await redis.set(
      cacheKey,
      JSON.stringify(response),
      'EX',
      300, // 5 minutes
    );

    return Response.json(response);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: 'Failed to search books.',
      },
      {
        status: 500,
      },
    );
  }
}
