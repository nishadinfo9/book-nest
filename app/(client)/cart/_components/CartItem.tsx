'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CartType as CartItemType } from '@/types/cart.type';
import { useCart } from '@/hooks/useCart';
import { removeCart, updateCartQuantity } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const {
    author,
    quantity,
    id,
    title,
    coverImage,
    price,
    slug,
    averageRating,
    discountPrice,
  } = item;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: string; quantity: number }) =>
      updateCartQuantity(cartId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (cartId: string) => removeCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  return (
    <div className='flex gap-5 rounded-xl border bg-white p-4 transition hover:shadow-sm'>
      {/* Book Image */}
      <Link
        href={`/shop/${slug}`}
        className='relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100'
      >
        <Image
          src={coverImage ?? '/book-demo.jpg'}
          alt={title}
          fill
          className='object-cover'
        />
      </Link>

      {/* Book Info */}
      <div className='flex flex-1 flex-col'>
        <div className='flex items-start justify-between'>
          <div>
            <Link
              href={`/shop/${slug}`}
              className='line-clamp-2 text-lg font-semibold hover:underline'
            >
              {title}
            </Link>

            <p className='text-muted-foreground mt-1 text-sm'>{author}</p>

            <div className='mt-2 flex items-center gap-1 text-sm'>
              <Star size={15} className='fill-yellow-400 text-yellow-400' />

              <span>{averageRating}</span>
            </div>
          </div>

          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              removeFromCartMutation.mutate(id);
            }}
          >
            <Trash2 size={18} className='text-red-500' />
          </Button>
        </div>

        <div className='mt-auto flex items-center justify-between'>
          {/* Price */}
          <div>
            <span className='text-lg font-bold'>${price}</span>

            {discountPrice && (
              <span className='text-muted-foreground ml-2 text-sm line-through'>
                ${discountPrice}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className='flex items-center rounded-lg border'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                mutation.mutate({
                  cartId: id,
                  quantity: quantity - 1,
                });
              }}
            >
              <Minus size={16} />
            </Button>

            <span className='w-10 text-center font-medium'>{quantity}</span>

            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                mutation.mutate({
                  cartId: id,
                  quantity: quantity + 1,
                });
              }}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
