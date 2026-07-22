import { db } from "@/lib/db/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {

  try {
    const formData = await request.formData();

    const tranId = formData.get("tran_id")?.toString();

    if (!tranId) {
      return Response.redirect(
        new URL("/checkout", request.url)
      );
    }

    await db.update(orders).set({
      status: 'CANCELLED',
      paymentStatus: 'CANCELLED'
    }).where(eq(orders.transactionId, tranId))

    return Response.redirect(
      new URL(`/payment/cancel`, request.url)
    );
  } catch (error) {
    console.error(error);

    return Response.redirect(
      new URL("/checkout", request.url)
    );
  }
}