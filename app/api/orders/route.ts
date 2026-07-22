import { db } from "@/lib/db/db";
import {
  books,
  cartItems,
  inventory,
  orderItems,
  orders,
  users,
} from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

const storeId = process.env.STORE_ID!;
const storePassword = process.env.SSL_API_SECRET!;

export async function POST(request: Request) {
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




    const { shippingAddress } = await request.json();

    const carts = await db
      .select()
      .from(cartItems)
      .innerJoin(books, eq(cartItems.bookId, books.id))
      .innerJoin(inventory, eq(inventory.bookId, books.id))
      .where(eq(cartItems.userId, user.id));



    if (carts.length === 0) {
      return Response.json(
        { success: false, message: "Cart is empty" },
        { status: 404 }
      );
    }




    // Validate stock
    for (const item of carts) {
      if (item.inventory.availableStock < item.cart_items.quantity) {
        return Response.json(
          {
            success: false,
            message: `${item.books.title} is out of stock.`,
          },
          { status: 400 }
        );
      }
    }




    const total = carts.reduce(
      (sum, item) =>
        sum + Number(item.books.price) * item.cart_items.quantity,
      0
    );

    let order: typeof orders.$inferSelect | undefined;

    await db.transaction(async (tx) => {
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId: user.id,
          totalAmount: String(total),
          shippingAddress,
          status: "PENDING",
        })
        .returning();

      if (!newOrder) {
        throw new Error("Failed to create order.");
      }




      order = newOrder;

      await tx.insert(orderItems).values(
        carts.map((item) => ({
          orderId: newOrder.id,
          bookId: item.books.id,
          quantity: item.cart_items.quantity,
          price: item.books.price,
        }))
      );
    });




    const tranId = `ORD-${order!.id}-${Date.now()}`;

    await db
      .update(orders)
      .set({
        transactionId: tranId,
      })
      .where(eq(orders.id, order!.id));

    const paymentData = {
      store_id: storeId,
      store_passwd: storePassword,

      total_amount: total.toString(),
      currency: "BDT",
      tran_id: tranId,

      success_url: `${process.env.NEXTAUTH_URL}/api/payment/success`,
      fail_url: `${process.env.NEXTAUTH_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXTAUTH_URL}/api/payment/cancel`,
      ipn_url: `${process.env.NEXTAUTH_URL}/api/payment/ipn`,

      shipping_method: "NO",

      product_name: "Book Order",
      product_category: "Books",
      product_profile: "general",

      cus_name: user.name ?? "Customer",
      cus_email: user.email,
      cus_add1: shippingAddress,
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
    };


    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(paymentData),
      }
    );

    const apiResponse = await response.json();

    if (apiResponse.status === "SUCCESS") {
      console.log('apiResponse', apiResponse)
      return Response.json({
        success: true,
        gatewayUrl: apiResponse.GatewayPageURL,
      });
    }

    return Response.json(
      {
        success: false,
        message: apiResponse.failedreason,
      },
      {
        status: 400,
      }
    );



  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

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

    console.log('allOrders', allOrders)

    return Response.json(allOrders, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'order not found' }, { status: 404 })
  }
}