import { completePayment } from "../complete-payment";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const valId = formData.get("val_id")?.toString();
    const tranId = formData.get("tran_id")?.toString();

    if (!valId || !tranId) {
      return Response.json(
        { success: false },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      val_id: valId,
      store_id: process.env.STORE_ID!,
      store_passwd: process.env.SSL_API_SECRET!,
      format: "json",
    });

    const response = await fetch(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?${params.toString()}`
    );

    const validation = await response.json();

    if (
      validation.status !== "VALID" &&
      validation.status !== "VALIDATED"
    ) {
      return Response.json(
        { success: false },
        { status: 400 }
      );
    }

    await completePayment({
      tranId,
      validation,
    });

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}