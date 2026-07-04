"use client";

import { getSingleBook } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

import BookGallery from "./_components/BookGallery";
import BookInfo from "./_components/BookInfo";
import BookDescription from "./_components/BookDescription";
import BookMeta from "./_components/BookMeta";
import ReviewForm from "./_components/ReviewForm";
import ReviewCard from "./_components/ReviewCard";

export default function Page() {
  const { slug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["single-book", slug],
    queryFn: () => getSingleBook(slug as string),
  });

  const book = data?.data;

  if (isLoading) {
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

        <BookGallery image={book.coverImage} />

        <BookInfo book={book} />

      </section>

      <BookDescription description={book.description} />

      <BookMeta book={book} />

      <section className="mt-16">

        <h2 className="text-2xl font-bold mb-8">
          Customer Reviews
        </h2>

        <div className="space-y-6">

          <ReviewCard />

          <ReviewCard />

        </div>

      </section>

      <ReviewForm />

    </main>
  );
}