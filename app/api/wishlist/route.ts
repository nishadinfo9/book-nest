import { db } from '@/lib/db/db';
import { wishlists } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { bookId } = await request.json();
  if (!bookId) {
    return Response.json({ message: 'Book ID is required' }, { status: 400 });
  }

  try {
    //1. Check if the book is already in the wishlist
    //2. If not, add the book to the wishlist
    //3  If yes, remove the book from the wishlist
    //4. Return the updated wishlist

    const existingWishlist = await db
      .select()
      .from(wishlists)
      .where(eq(wishlists.bookId, bookId))
      .limit(1);

    if (existingWishlist.length > 0) {
      // Book is already in the wishlist, remove it
      await db.delete(wishlists).where(eq(wishlists.bookId, bookId));
      return Response.json(
        { message: 'Book removed from wishlist' },
        { status: 200 },
      );
    }

    // Book is not in the wishlist, add it
    await db
      .insert(wishlists)
      .values({ bookId, userId: 'user-id-placeholder' });

    return Response.json(
      { message: 'Book added to wishlist' },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: 'Error while getting wishlist items' },
      { status: 500 },
    );
  }
}
