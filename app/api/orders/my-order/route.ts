import { db } from "@/lib/db/db";
import {
    books,
    orderItems,
    orders,
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

        const allOrders = await db
            .select({
                book: books.title,
                status: orders.status,
                totalAmount: orders.totalAmount,
                paymentStatus: orders.paymentStatus,
                shippingAddress: orders.shippingAddress,
            })
            .from(orders)
            .leftJoin(users, eq(users.id, orders.userId))
            .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
            .leftJoin(books, eq(books.id, orderItems.bookId))
            .orderBy(desc(orders.createdAt))

        return Response.json(allOrders, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'order not found' }, { status: 404 })
    }
}