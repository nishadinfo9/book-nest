ALTER TABLE "cart_items" ADD COLUMN "session_id" text;--> statement-breakpoint
CREATE UNIQUE INDEX "cart_user_book_unique" ON "cart_items" USING btree ("user_id","book_id");--> statement-breakpoint
CREATE UNIQUE INDEX "cart_session_book_unique" ON "cart_items" USING btree ("session_id","book_id");