import { db } from '@/lib/db/db';
import { wishlists } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { bookId } = await request.json();
    if (!bookId) {
      return Response.json({ message: 'Book ID is required' }, { status: 400 });
    }

    const userId = session.user.id;

    const wishlistItem = await db
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
      },
      {
        status: 500,
      },
    );
  }
}
