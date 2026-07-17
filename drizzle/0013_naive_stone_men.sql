ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_book_id_books_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "book_id";