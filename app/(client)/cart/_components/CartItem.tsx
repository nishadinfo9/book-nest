'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart.type';
import { useCart } from '@/hooks/useCart';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const { book, quantity } = item;

  return (
    <div className="flex gap-5 rounded-xl border bg-white p-4 transition hover:shadow-sm">
      {/* Book Image */}
      <Link
        href={`/shop/${book.slug}`}
        className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100"
      >
        <Image
          src={book.coverImage ?? '/book-demo.jpg'}
          alt={book.title}
          fill
          className="object-cover"
        />
      </Link>

      {/* Book Info */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/shop/${book.slug}`}
              className="line-clamp-2 text-lg font-semibold hover:underline"
            >
              {book.title}
            </Link>

            <p className="mt-1 text-sm text-muted-foreground">
              {book.author}
            </p>

            <div className="mt-2 flex items-center gap-1 text-sm">
              <Star
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>{book.averageRating}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(book.id)}
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          {/* Price */}
          <div>
            <span className="text-lg font-bold">
              ${book.price}
            </span>

            {book.discountPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${book.discountPrice}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center rounded-lg border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => decreaseQuantity(book.id)}
            >
              <Minus size={16} />
            </Button>

            <span className="w-10 text-center font-medium">
              {quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => increaseQuantity(book.id)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}