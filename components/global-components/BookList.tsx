'use client';

import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/http/api';
import { BookType } from '@/types/book.type';
import BookCard from './BookCard';
import BookCardSkeleton from './BookCardSkeleton';

export default function BookList() {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<BookType[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='mx-auto mt-8 max-w-7xl px-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Recently Added</h2>

        <button className='text-sm text-gray-500 underline'>See all →</button>
      </div>

      <div className='grid grid-cols-5 gap-6'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}

        {!isLoading &&
          books?.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  );
}
