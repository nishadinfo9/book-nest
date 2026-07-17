import { db } from '@/lib/db/db';
import {
  books,
  cartItems,
  inventory,
  orderItems,
  orders,
  users,
} from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session?.user.email) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [existUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!existUser) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  const { paymentMethod, shippingAddress } = await request.json();

      const carts = await db
      .select()
      .from(cartItems)
      .innerJoin(books, eq(cartItems.bookId, books.id))
      .innerJoin(inventory, eq(inventory.bookId, books.id))
      .where(eq(cartItems.userId, existUser.id))

    if (carts.length === 0) {
      return Response.json({ message: 'Cart is empty' }, { status: 404 });
    }

  await db.transaction(async (tx) => {


    for (const items of carts) {
      if (!items.books) {
        return Response.json('books not found', { status: 404 });
      }
      if (!items.inventory) {
        return Response.json('inventory not found', { status: 404 });
      }

      if (items.inventory.availableStock < items.cart_items.quantity) {
        return Response.json('Not enough stock', { status: 404 });
      }
    }

    const total = carts.reduce((sum, item) => {
      return sum + Number(item.books.price) * Number(item.cart_items.quantity);
    }, 0);

    const [newOrder] = await tx
      .insert(orders)
      .values({
        userId: existUser.id,
        totalAmount: String(total),
        paymentMethod,
        shippingAddress,
      })
      .returning();

    if (!newOrder) {
      return Response.json({ message: 'order not created' }, { status: 401 });
    }

    const newOrderItem = await tx.insert(orderItems).values(
      carts.map((item) => ({
        orderId: newOrder.id,
        bookId: item.books.id,
        quantity: item.cart_items.quantity,
        price: item.books.price,
      })),
    );

    if (newOrderItem.length === 0) {
      return Response.json(
        { message: 'order-items not created' },
        { status: 401 },
      );
    }

    for (const item of carts) {
      await tx
        .update(inventory)
        .set({
          soldStock: item.inventory.soldStock + item.cart_items.quantity,
          availableStock:
            item.inventory.availableStock - item.cart_items.quantity,
        })
        .where(eq(inventory.bookId, item.books.id))
    }

    await tx.delete(cartItems).where(and(eq(cartItems.userId, existUser.id)));
    // add payment
  });

  return Response.json(
    { message: 'order created successfully' },
    { status: 201 },
  );
}
