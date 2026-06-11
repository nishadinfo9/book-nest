"use client";

import { getSingleBook } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function BookPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: book , isLoading} = useQuery({
    queryKey: ["book", slug],
    queryFn: () => getSingleBook(slug),
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Price: {book.price}</p>
    </div>
  );
}
