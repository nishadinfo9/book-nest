'use client';

import { BookType } from '@/types/book.type';
import BookCard from './BookCard';
import BookCardSkeleton from './BookCardSkeleton';
import Container from '../common/Container';

type Props = {
  title: string
    books?: BookType[];
    loading: boolean;
};

export default function BookList({
  title,
    books,
    loading,
}: Props)  {
  // const {
  //   data: books,
  //   isLoading,
  //   isError,
  // } = useQuery<BookType[]>({
  //   queryKey: ['books'],
  //   queryFn: getBooks,
  // });



  return (
    <Container>
              <section className="mt-8 ">
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{title}</h2>

        <button className='text-sm text-gray-500 underline'>See all →</button>
      </div>

      <div className='grid grid-cols-5 gap-6'>
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}

        {!loading &&
          books?.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
    </Container>
  );
}
