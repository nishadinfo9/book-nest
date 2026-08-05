DROP INDEX "cart_user_book_unique";--> statement-breakpoint
DROP INDEX "cart_session_book_unique";--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "session_id";