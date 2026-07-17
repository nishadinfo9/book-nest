import { NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { authors, books, users } from '@/lib/db/schema';
import { cartItems } from '@/lib/db/schema';
import { CartSchema } from '@/lib/validation/cartSchema';
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

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  try {
    const body = await request.json();

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

    const { bookId } = parsed.data;

    // Check book exists
    const [book] = await db.select().from(books).where(eq(books.id, bookId));

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    // Check existing cart item
    const [existing] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.bookId, bookId), eq(cartItems.userId, user.id)));


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

    await db.insert(cartItems).values({
      bookId,
      quantity: 1,
      userId: user.id,
    });


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
  const session = await getServerSession();

  if (!session?.user.email) {
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

  try {
    const items = await db
      .select({
        id: cartItems.id,
        bookId: books.id,
        title: books.title,
        slug: books.slug,
        coverImage: books.coverImage,
        author: authors.name,
        averageRating: books.averageRating,
        price: books.price,
        discountPrice: books.discountPrice,
        quantity: cartItems.quantity,
      })
      .from(cartItems)
      .leftJoin(books, eq(cartItems.bookId, books.id))
      .leftJoin(authors, eq(books.authorId, authors.id))
      .where(eq(cartItems.userId, user.id));

    const formattedItems = items.map((item) => {
      const unitPrice = item.price ?? item.price;
      const subtotal = Number(unitPrice) * item.quantity;

      return {
        ...item,
        subtotal,
      };
    });

    const summary = formattedItems.reduce(
      (acc, item) => {
        const originalPrice = Number(item.price) * item.quantity;
        const discountedPrice = item.subtotal;

        acc.totalItems += 1;
        acc.totalQuantity += item.quantity;
        acc.subtotal += discountedPrice;
        acc.discount += originalPrice - discountedPrice;

        return acc;
      },
      {
        totalItems: 0,
        totalQuantity: 0,
        subtotal: 0,
        discount: 0,
      },
    );

    // Business Rules
    const shipping = summary.subtotal >= 1000 ? 0 : 80;
    const tax = Math.round(summary.subtotal * 0.05); // 5%
    const total = summary.subtotal + shipping + tax;

    return NextResponse.json({
      items: formattedItems,
      summary: {
        ...summary,
        shipping,
        tax,
        total,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
