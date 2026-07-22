import { db } from "@/lib/db/db";
import {
    cartItems,
    inventory,
    orderItems,
    orders,
    payments,
} from "@/lib/db/schema";

import { eq, sql } from "drizzle-orm";

type ValidationResponse = {
    amount: string;
    currency: string;
    card_brand?: string;
    card_type?: string;
    bank_tran_id?: string;
};

type CompletePaymentParams = {
    tranId: string;
    validation: ValidationResponse;
};

export async function completePayment({
    tranId,
    validation,
}: CompletePaymentParams) {
    await db.transaction(async (tx) => {
        // Find order
        const [order] = await tx
            .select()
            .from(orders)
            .where(eq(orders.transactionId, tranId))
            .limit(1);

        if (!order) {
            throw new Error("Order not found");
        }

        // Already processed?
        if (order.paymentStatus === "PAID") {
            return;
        }

        // Verify amount
        if (Number(validation.amount) !== Number(order.totalAmount)) {
            throw new Error("Payment amount mismatch");
        }

        // Verify currency
        if (validation.currency !== "BDT") {
            throw new Error("Invalid currency");
        }

        // Check duplicate payment
        const [existingPayment] = await tx
            .select()
            .from(payments)
            .where(eq(payments.transactionId, tranId))
            .limit(1);

        if (existingPayment) {
            return;
        }

        // Update Order
        await tx
            .update(orders)
            .set({
                paymentStatus: "PAID",
                status: "PROCESSING",
                paymentGateway: "SSLCOMMERZ",
                paymentMethod: validation.card_brand as
                    | "VISA"
                    | "MASTER"
                    | "AMEX"
                    | "IB "
                    | "MOBILEBANKING",
                paidAt: new Date(),
            })
            .where(eq(orders.transactionId, tranId));

        // Save Payment
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

        // Get order items
        const items = await tx
            .select()
            .from(orderItems)
            .where(eq(orderItems.orderId, order.id));

        // Update inventory
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

        // Clear cart
        await tx
            .delete(cartItems)
            .where(eq(cartItems.userId, order.userId));
    });
}