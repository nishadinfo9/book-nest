ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_book_id_books_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "session_id";