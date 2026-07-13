import { db } from '@/lib/db/db';
import {
  authors,
  books,
  categories,
  publishers,
  wishlists,
} from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

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
        wishlisted: sql<boolean>`${wishlists.id} IS NOT NULL`,
      })
      .from(books)
      .where(eq(books.slug, slug))
      .limit(1)
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(authors, eq(authors.id, books.authorId))
      .leftJoin(wishlists, eq(wishlists.bookId, books.id)); //check userId also

    if (!book.length) {
      return Response.json({ error: 'Book not found' }, { status: 404 });
    }

    return Response.json({
      data: book[0],
    });
  } catch (error) {
    console.error('Book not found:', error);
    return Response.json({ error: 'Book not found' }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const deletedBook = await db
      .delete(books)
      .where(eq(books.slug, slug))
      .returning({
        id: books.id,
      });

    if (deletedBook.length === 0) {
      return Response.json({ error: 'Book not found' }, { status: 404 });
    }

    return Response.json(
      {
        message: 'Book deleted successfully',
        id: deletedBook[0].id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Delete book error:', error);

    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
