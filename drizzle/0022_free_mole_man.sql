CREATE TYPE "public"."payment_gateway" AS ENUM('SSLCOMMERZ', 'STRIPE', 'BKASH', 'NAGAD', 'PAYPAL');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('CARD', 'MFS', 'BANK', 'CASH_ON_DELIVERY');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIAL_REFUND');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"transaction_id" varchar(100) NOT NULL,
	"gateway" varchar(30) NOT NULL,
	"method" varchar(30),
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'BDT' NOT NULL,
	"status" varchar(20) DEFAULT 'PENDING' NOT NULL,
	"gateway_transaction_id" varchar(100),
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "payment_status" SET DEFAULT 'PENDING'::"public"."payment_status";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "payment_status" SET DATA TYPE "public"."payment_status" USING "payment_status"::"public"."payment_status";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "payment_method" SET DATA TYPE "public"."payment_method" USING "payment_method"::"public"."payment_method";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_gateway" "payment_gateway";--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payments_order_idx" ON "payments" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "payments_tran_idx" ON "payments" USING btree ("transaction_id");