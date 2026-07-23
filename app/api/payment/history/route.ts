import { db } from "@/lib/db/db";
import {
  books,
  orderItems,
  payments,
  users,
} from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";



export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const paymentHistory = await db
    .select(
      { 
        book: books.title,
        transactionId: payments.transactionId,
        gateway: payments.gateway,
        method: payments.method,
        amount: payments.amount,
        currency: payments.currency,
        status: payments.status
     }
    )
    .from(payments)
    .leftJoin(orderItems, eq(orderItems.orderId, payments.orderId))
    .leftJoin(books, eq(books.id, orderItems.bookId))
    .orderBy(desc(payments.createdAt))

    console.log('paymentHistory', paymentHistory)

    return Response.json(paymentHistory, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'order not found' }, { status: 404 })
  }
}