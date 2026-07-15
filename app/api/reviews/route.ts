import { uploadImageToCloudinary } from '@/lib/cloudinary/uploadImage';
import { db } from '@/lib/db/db';
import { reviews, users } from '@/lib/db/schema';
import { ReviewFormSchema } from '@/lib/validation/reviewSchema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session?.user.email) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  console.log('user', user);

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get('coverImage') as File;
  const bookId = formData.get('bookId');
  const rating = formData.get('rating');
  const comment = formData.get('comment');

  const data = ReviewFormSchema.safeParse({ bookId, rating, comment });

  if (!data.success) {
    return Response.json(
      { message: 'review validation failed' },
      { status: 400 },
    );
  }

  const validation = data.data

  try {
    const bookReviews = await db
      .select()
      .from(reviews)
      .where(and( eq(reviews.userId, user.id), eq(reviews.bookId, validation.bookId),))
      .limit(1);

    if (bookReviews.length === 0) {
      return Response.json(
        { message: 'review already exist' },
        { status: 401 },
      );
    }

    let bookImageUrl: string | null = null;

    if (file instanceof File) {
      bookImageUrl = await uploadImageToCloudinary(file, 'review');
    }

    await db
      .insert(reviews)
      .values({
        userId: user.id,
        bookId: validation.bookId,
        rating: validation.rating,
        comment: validation.comment,
        image: bookImageUrl ,
      });

    return Response.json('review created successfully', { status: 200 });
  } catch (error) {
    console.log('review creating error', error);
    return Response.json({ message: 'review creating error' }, { status: 500 });
  }
}
