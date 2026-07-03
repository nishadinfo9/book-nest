'use client'

import Image from 'next/image';
import {  Star } from 'lucide-react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/http/api';
import { BookType } from '@/types/book.type';

// const books = [
//   {
//     id: 1,
//     title: 'Elon musk: autobiography',
//     author: 'walter isaacson',
//     image: 'https://www.bookowlsbd.com/cdn/shop/files/ElonMuskBookbyWalterIsaacson.jpg?v=1755747204&width=600',
//     price: 35,
//     discountPrice: 25,
//     averageRating: 4.7,
//   },
//   {
//     id: 2,
//     title: 'Atomic Habits',
//     author: 'James Clear',
//     image:
//       'https://www.bookowlsbd.com/cdn/shop/files/27_d673dfd1-66c2-4ed0-996e-47b822f38fa5.png?v=1704026384',
//     price: 35,
//     discountPrice: 25,
//     averageRating: 4.7,
//   },
//   {
//     id: 3,
//     title: 'Good to Great: Why Some Companies Make the Leap... and Others Don\'t',
//     author: 'James C. Collins',
//     image: 'https://www.bookowlsbd.com/cdn/shop/files/GoodtoGreatWhySomeCompaniesMaketheLeapandOthersDon_tbyJamesC.Collins.jpg',
//     price: 35,
//     discountPrice: 25,
//     averageRating: 4.7,
//   },
// ];



export default function BookGrid() {

    const {
    data: books,
    isLoading,
    isError,
  } = useQuery<BookType[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  console.log('books', books)

  return (
    <section className='mt-8 px-10'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Recently Added</h2>

        <button className='text-sm text-gray-500 underline'>See all →</button>
      </div>

      <div className='grid grid-cols-5 gap-6'>
        {books?.map((book) => (
          <div key={book.id} className='group'>
            {/* book image */}

            <div className='relative h-[180px] overflow-hidden rounded-md bg-gray-100'>
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className='object-contain p-2 transition group-hover:scale-105'
              />
            </div>

            {/* info */}

            <div className='mt-3'>

              <div className='mt-1 flex items-center justify-between'>
              <h3 className='truncate text-sm font-medium'>{book.title}</h3>
               
                <div className='flex items-center gap-1 text-xs'>
                  <Star size={12} className='fill-yellow-400 text-yellow-400' />

                  <span>{book.averageRating}</span>
                </div>
              </div>
               <p className='truncate text-xs text-gray-400'>{book.author}</p>


              <div className='my-2 flex items-center gap-2'>
                <span className='text-sm font-semibold'>${book.price}</span>

                <span className='text-xs text-gray-400 line-through'>
                  ${book.discountPrice}
                </span>

             <Button className='ml-auto'>Add to Cart</Button>
             
              </div>
          
               
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
