import { db } from "@/lib/db/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {

  try {
    const formData = await request.formData();

    const tranId = formData.get("tran_id")?.toString();

    if (!tranId) {
      return Response.redirect(new URL("/payment/fail", request.url));
    }

    await db.update(orders).set({
      status: 'FAILED',
      paymentStatus: 'FAILED'
    }).where(eq(orders.transactionId, tranId))

    return Response.redirect(
      new URL(`/payment/fail?tran_id=${tranId}`, request.url)
    );
  } catch (error) {
    console.error(error);

    return Response.redirect(
      new URL("/payment/fail", request.url)
    );
  }
}