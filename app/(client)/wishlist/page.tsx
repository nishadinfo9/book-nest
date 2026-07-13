'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  MoreHorizontal,
  ShoppingCart,
  Star,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getMyWishlists } from '@/http/api';
import { WishlistType } from '@/types/wishlist.type';
import CartButton from '@/components/global-components/CartButton';

// const wishlist = [
//   {
//     id: 1,
//     title: 'Atomic Habits',
//     author: 'James Clear',
//     image: '/book-demo.jpg',
//     price: 550,
//     discountPrice: 450,
//     rating: 4.8,
//     slug: 'atomic-habits',
//   },
//   {
//     id: 2,
//     title: 'Deep Work',
//     author: 'Cal Newport',
//     image: '/book-demo.jpg',
//     price: 620,
//     discountPrice: 520,
//     rating: 4.7,
//     slug: 'deep-work',
//   },
//   {
//     id: 3,
//     title: 'The Psychology of Money',
//     author: 'Morgan Housel',
//     image: '/book-demo.jpg',
//     price: 700,
//     discountPrice: 620,
//     rating: 4.9,
//     slug: 'psychology-of-money',
//   },
// ];

const WishList = () => {
  const { data: wishlistData } = useQuery({
    queryKey: ['my-wishlists'],
    queryFn: getMyWishlists,
  });

  console.log('wishlist', wishlistData);
  return (
    <main className='mt-8 px-10'>
      {/* Header */}
      <div className='mb-10 flex flex-col gap-2 border-b pb-6 md:flex-row md:items-end md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Wishlist</h1>

          <p className='text-muted-foreground mt-1 text-sm'>
            {wishlistData?.length} saved books
          </p>
        </div>
      </div>

      {!wishlistData ? (
        <div className='flex h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed'>
          <Heart className='text-muted-foreground mb-4 h-12 w-12' />

          <h2 className='text-xl font-semibold'>Your wishlist is empty</h2>

          <p className='text-muted-foreground mt-2 max-w-sm text-center text-sm'>
            {`Save books you love and they'll appear here for quick access.`}
          </p>

          <Button asChild className='mt-6'>
            <Link href='/shop'>Browse Books</Link>
          </Button>
        </div>
      ) : (
        <div className='space-y-5'>
          {wishlistData.map((book: WishlistType) => (
            <div
              key={book.id}
              className='group bg-background flex gap-5 rounded-2xl border p-5 transition-all hover:shadow-md'
            >
              {/* Cover */}
              <Link href={`/books/${book.slug}`}>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={120}
                  height={170}
                  className='rounded-lg object-cover'
                />
              </Link>

              {/* Info */}
              <div className='flex min-w-0 flex-1 flex-col justify-between'>
                <div>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0'>
                      <Link
                        href={`/shop/${book.slug}`}
                        className='hover:text-primary line-clamp-2 text-xl font-semibold transition-colors'
                      >
                        {book.title}
                      </Link>

                      <p className='text-muted-foreground mt-1 text-sm'>
                        by {book.author}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full'
                        >
                          <MoreHorizontal className='h-5 w-5' />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem className='text-red-600 focus:text-red-600'>
                          <Trash2 className='mr-2 h-4 w-4' />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className='mt-4 flex items-center gap-2 text-sm'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-medium'>{book.rating}</span>

                    <span className='text-muted-foreground'>
                      • Highly Rated
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='text-2xl font-bold'>
                      ৳{book.discountPrice}
                    </span>

                    <span className='text-muted-foreground line-through'>
                      ৳{book.price}
                    </span>
                  </div>

                  <div className='flex gap-3'>
                    <Button variant='outline' asChild>
                      <Link href={`/shop/${book.slug}`}>View Details</Link>
                    </Button>

                    <CartButton size='sm' className='ml-auto' bookId={book.id}>
                      Add to Cart
                    </CartButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default WishList;
