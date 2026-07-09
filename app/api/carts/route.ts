import { NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { authors, books } from '@/lib/db/schema';
import { cartItems } from '@/lib/db/schema';
import { CartSchema } from '@/lib/validation/cartSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('step 1');

    const parsed = CartSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    console.log('step 2');

    const { bookId } = parsed.data;

    // Check book exists
    const [book] = await db.select().from(books).where(eq(books.id, bookId));

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    console.log('step 3');

    // Check existing cart item
    const [existing] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.bookId, bookId)));

    console.log('step 4');

    if (existing) {
      await db
        .update(cartItems)
        .set({
          quantity: existing.quantity + 1,
        })
        .where(eq(cartItems.id, existing.id));

      console.log('step 5');

      return NextResponse.json(
        {
          message: 'Quantity updated',
        },
        { status: 200 },
      );
    }

    console.log('step 6');

    await db.insert(cartItems).values({
      bookId,
      quantity: 1,
    });

    console.log('step 7');

    return NextResponse.json(
      {
        message: 'Added to cart',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const cart = await db
      .select({
        id: cartItems.id,
        title: books.title,
        quantity: cartItems.quantity,
        coverImage: books.coverImage,
        price: books.price,
        slug: books.slug,
        averageRating: books.averageRating,
        discountPrice: books.discountPrice,
        author: authors.name, // Assuming you want to include the author's name

      })
      .from(cartItems)
      .leftJoin(books, eq(cartItems.bookId, books.id))
      .leftJoin(authors, eq(books.authorId, authors.id)); 
    return NextResponse.json( cart );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
