import { db } from "@/lib/db/db";
import { cartItems, inventory, orderItems, orders, payments } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const valId = formData.get("val_id")?.toString();
    const tranId = formData.get("tran_id")?.toString();

      console.log('1',)


    if (!valId || !tranId) {
      return NextResponse.redirect(
        new URL("/payment/fail?reason=missing_data", request.url)
      );
    }

      console.log('2',)


    const params = new URLSearchParams({
      val_id: valId,
      store_id: process.env.STORE_ID!,
      store_passwd: process.env.SSL_API_SECRET!,
      format: "json",
    });

      console.log('3',)


    const validationResponse = await fetch(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

      console.log('4',)


    const validation = await validationResponse.json();

    console.log('validation', validation);

    if (
      validation.status === "VALID" ||
      validation.status === "VALIDATED"
    ) {

      console.log('5',)

      // Database Transaction
      await db.transaction(async (tx) => {
      console.log('6',)

        // Find Order
        const [order] = await tx
          .select()
          .from(orders)
          .where(eq(orders.transactionId, tranId))
          .limit(1);

        if (!order) {
          throw new Error("Order not found");
        }
      console.log('7',)


        if (order.paymentStatus === "PAID") {
          return;
        }

      console.log('8',)



        // 1. Update Order
        await tx
          .update(orders)
          .set({
            paymentStatus: "PAID",
            paymentMethod: validation.card_brand,
            status: "PROCESSING",
            transactionId: tranId,
            paymentGateway: 'SSLCOMMERZ',
            paidAt: new Date(),
          })
          .where(eq(orders.transactionId, tranId));

      console.log('9',)


        // 2. Save Payment
        await tx.insert(payments).values({
          orderId: order.id,
          transactionId: tranId,
          gateway: "SSLCOMMERZ",
          method: validation.card_type ?? "UNKNOWN",
          amount: validation.amount,
          currency: validation.currency,
          status: "PAID",
          gatewayTransactionId: validation.bank_tran_id,
          paidAt: new Date(),
        });

      console.log('10',)


        const items = await tx
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));

      console.log('11',)


        // 3. Update Inventory
        for (const item of items) {
          await tx
            .update(inventory)
            .set({
              availableStock: sql`${inventory.availableStock} - ${item.quantity}`,
              soldStock: sql`${inventory.soldStock} + ${item.quantity}`,
              updatedAt: new Date(),
            })
            .where(eq(inventory.bookId, item.bookId));
        }

      console.log('12',)

        // 4. Clear Cart
        await tx
          .delete(cartItems)
          .where(eq(cartItems.userId, order.userId));
      console.log('13',)


      });

      return NextResponse.redirect(
        new URL(`/payment/success?tran_id=${tranId}`, request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/payment/fail?reason=validation_failed", request.url)
    );


    // TODO:
    // 1. Verify payment with SSLCommerz Validation API
    // 2. Update Order Status = PAID
    // 3. Update Inventory
    // 4. Delete Cart
    // 5. Save Payment Information
  } catch (error) {
    console.log('Error payment success time', error)
    return NextResponse.redirect(
      new URL("/payment/fail", request.url)
    );
  }
}