ALTER TABLE "wishlist_items" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "wishlist_items" CASCADE;--> statement-breakpoint
ALTER TABLE "wishlists" ADD COLUMN "book_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;