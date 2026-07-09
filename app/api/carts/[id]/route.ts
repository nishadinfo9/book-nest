import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db/db';
import { cartItems } from '@/lib/db/schema';
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { quantity } = await request.json();
  const { id } = await params;

  console.log({ quantity, id });

  if (quantity < 1) {
    return NextResponse.json({ message: 'Invalid quantity' }, { status: 400 });
  }

  await db
    .update(cartItems)
    .set({
      quantity,
      updatedAt: new Date(),
    })
    .where(and(eq(cartItems.id, id)));

  return NextResponse.json({
    message: 'Quantity updated',
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await db.delete(cartItems).where(eq(cartItems.id, id));
    return NextResponse.json({
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Error removing item from cart',
      },
      { status: 500 },
    );
  }
}
