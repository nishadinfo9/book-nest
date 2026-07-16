"use client";

import { getReviews, getSingleBook } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

import BookGallery from "./_components/BookGallery";
import BookInfo from "./_components/BookInfo";
import BookDescription from "./_components/BookDescription";
import BookMeta from "./_components/BookMeta";
import ReviewForm from "./_components/ReviewForm";
import ReviewCard from "./_components/ReviewCard";
import { ReviewType } from "@/types/review.type";

export default function Page() {
  const { slug } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["single-book", slug],
    queryFn: () => getSingleBook(slug as string),
  });

  const book = data?.data;

    const { data: reviews, isLoading:reviewLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(),
  });

  console.log('reviews', reviews)

  if (isLoading ) {
    return (
      <div className="container py-10">
        <Skeleton className="h-[550px] w-full rounded-xl" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container py-20 text-center">
        Book not found.
      </div>
    );
  }

  return (
    <main className="container px-10 mt-8">

      <section className="grid lg:grid-cols-2 gap-12">

        <BookGallery book={book} />

        <BookInfo book={book} />

      </section>

      <BookDescription description={book.description} />

      <BookMeta book={book} />

      <section className="mt-16">

        <h2 className="text-2xl font-bold mb-8">
          Customer Reviews
        </h2>

        <div className="space-y-6">

          {
            reviews.map((item: ReviewType)=>(
              <ReviewCard key={item.id} item={item}/>
            ))
          }


        </div>

      </section>

      <ReviewForm bookId={book.id}/>

    </main>
  );
}