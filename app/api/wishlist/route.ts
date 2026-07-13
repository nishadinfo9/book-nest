import { db } from '@/lib/db/db';
import { users, wishlists } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  const { bookId } = await request.json();

  if (!bookId) {
    return Response.json({ message: 'Book ID is required' }, { status: 400 });
  }
  try {
    const userId = user.id;

    const [wishlistItem] = await db
      .select()
      .from(wishlists)
      .where(and(eq(wishlists.bookId, bookId), eq(wishlists.userId, userId)))
      .limit(1);

    if (wishlistItem) {
      await db
        .delete(wishlists)
        .where(and(eq(wishlists.userId, userId), eq(wishlists.bookId, bookId)));

      return Response.json({
        success: true,
        inWishlist: false,
        message: 'Removed from wishlist',
      });
    }

    await db.insert(wishlists).values({
      userId,
      bookId,
    });

    return Response.json({
      success: true,
      inWishlist: true,
      message: 'Added to wishlist',
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'Internal Server Error',
        error,
      },
      {
        status: 500,
      },
    );
  }
}
