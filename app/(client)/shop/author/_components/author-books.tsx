"use client";

import BookCard from "@/components/global-components/BookCard";
import { BookType } from "@/types/book.type";
import { BookOpen } from "lucide-react";

interface AuthorBooksProps {
  books: BookType[];
  totalBooks?: number;
}

export function AuthorBooks({
  books,
  totalBooks,
}: AuthorBooksProps) {
  return (
    <section className="space-y-8 mt-8 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Books
          </h2>

          <p className="text-muted-foreground mt-1">
            Showing {books.length}
            {totalBooks && totalBooks > books.length && (
              <> of {totalBooks}</>
            )}{" "}
            books
          </p>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>

          <h3 className="text-xl font-semibold">
            No books available
          </h3>

          <p className="mt-2 text-muted-foreground">
            {`This author hasn't published any books yet.`}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books?.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>

          {totalBooks && totalBooks > books.length && (
            <div className="flex justify-center pt-4">
              <p className="text-sm text-muted-foreground">
                Showing first {books.length} books
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}