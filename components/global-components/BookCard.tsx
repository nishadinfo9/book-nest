'use client';

import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { BookType } from '@/types/book.type';
import Link from 'next/link';

export default function BookCard({ book }: { book: BookType }) {
  return (
    <div className='group'>
      {/* Book Image */}
      <div className='relative h-[180px] overflow-hidden rounded-md bg-gray-100'>
        <Link href={`/shop/${book.slug}`}>
          <Image
            src={book.coverImage ?? '/book-demo.jpg'}
            alt={book.title}
            fill
            className='object-contain p-2 transition duration-300 group-hover:scale-105'
          />
        </Link>

        {/* Wishlist */}
        <Button
          size='icon'
          variant='secondary'
          className='absolute top-2 left-2 z-10 h-8 w-8 rounded-full bg-white/90 shadow-sm backdrop-blur hover:bg-white'
        >
          <Heart
            size={16}
            className='text-gray-600 hover:fill-red-500 hover:text-red-500'
          />
        </Button>
      </div>

      {/* Info */}
      <div className='mt-3'>
        <div className='flex items-center justify-between'>
          <h3 className='truncate text-sm font-medium'>{book.title}</h3>

          <div className='flex items-center gap-1 text-xs'>
            <Star size={12} className='fill-yellow-400 text-yellow-400' />
            <span>{book.averageRating}</span>
          </div>
        </div>

        <p className='truncate text-xs text-gray-400'>{book.author}</p>

        <div className='mt-2 flex items-center gap-2'>
          <span className='text-sm font-semibold'>${book.price}</span>

          <span className='text-xs text-gray-400 line-through'>
            ${book.discountPrice}
          </span>

          <Button size='sm' className='ml-auto'>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
