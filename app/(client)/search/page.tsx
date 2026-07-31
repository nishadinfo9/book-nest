'use client';

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBookSearchResult } from "@/http/api";
import BookCard from "@/components/global-components/BookCard";
import BookCardSkeleton from "@/components/global-components/BookCardSkeleton";
import { BookType } from "@/types/book.type";

export default function SearchPage() {

    const params = useSearchParams();
    const term = params.get("term") ?? "";

    const { data: books, isLoading } = useQuery<BookType>({
        queryKey: ["search", term],
        queryFn: () => getBookSearchResult({ term })
    })

    console.log('books', books)

    if (books) {
        return (
            <section className='mx-auto mt-8 max-w-7xl px-6'>
                <div className='grid grid-cols-5 gap-6'>
                    {isLoading &&
                        Array.from({ length: 10 }).map((_, i) => (
                            <BookCardSkeleton key={i} />
                        ))}

                    {!isLoading &&
                        books?.map((book) => <BookCard key={book.id} book={book} />)}
                </div>
            </section>
        )
    }
}