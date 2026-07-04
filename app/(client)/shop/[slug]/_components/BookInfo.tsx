"use client";

import { BookType } from "@/types/book.type";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

export default function BookInfo({
  book,
}: {
  book: BookType;
}) {
  return (
    <div>

      <p className="text-sm text-muted-foreground">
        {book.author}
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {book.title}
      </h1>

      <div className="mt-4 flex items-center gap-2">

        <Star
          className="fill-yellow-400 text-yellow-400"
          size={18}
        />

        <span>
          {book.averageRating || 0}
        </span>

        <span className="text-muted-foreground">
          (245 Reviews)
        </span>

      </div>

      <div className="mt-8 flex items-center gap-4">

        <span className="text-4xl font-bold">

          ৳{book.discountPrice || book.price}

        </span>

        {book.discountPrice && (
          <span className="line-through text-gray-400">

            ৳{book.price}

          </span>
        )}

      </div>

      <p className="mt-8 text-muted-foreground leading-8">

        {book.description}

      </p>

      <div className="mt-10 flex gap-4">

        <Button size="lg">

          <ShoppingCart className="mr-2 h-5 w-5" />

          Add To Cart

        </Button>

        <Button
          variant="outline"
          size="lg"
        >
          Buy Now
        </Button>

      </div>
    </div>
  );
}