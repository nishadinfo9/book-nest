import { db } from "@/lib/db/db";
import { cartItems, inventory, orderItems, orders, payments } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { completePayment } from "../complete-payment";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const valId = formData.get("val_id")?.toString();
    const tranId = formData.get("tran_id")?.toString();


    if (!valId || !tranId) {
      return NextResponse.redirect(
        new URL("/payment/fail?reason=missing_data", request.url)
      );
    }


    const params = new URLSearchParams({
      val_id: valId,
      store_id: process.env.STORE_ID!,
      store_passwd: process.env.SSL_API_SECRET!,
      format: "json",
    });


    const validationResponse = await fetch(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );


    const validation = await validationResponse.json();
    if (
      validation.status === "VALID" ||
      validation.status === "VALIDATED"
    ) {


      await completePayment({
        tranId,
        validation,
      });

      return NextResponse.redirect(
        new URL(`/payment/success?tran_id=${tranId}`, request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/payment/fail?reason=validation_failed", request.url)
    );

  } catch (error) {
    console.log('Error payment success time', error)
    return NextResponse.redirect(
      new URL("/payment/fail", request.url)
    );
  }
}