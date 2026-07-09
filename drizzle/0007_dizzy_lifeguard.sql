ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" ADD COLUMN "book_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "user_id";