'use client';

import { getBooks } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

const Books = () => {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (books.length === 0) {
    return <div>No books found.</div>;
  }

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books?.map((book: any) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
