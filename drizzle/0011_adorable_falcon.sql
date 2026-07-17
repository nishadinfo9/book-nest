ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "user_id";