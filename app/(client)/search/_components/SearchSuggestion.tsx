import Image from "next/image";
import Link from "next/link";

export default function SearchSuggestion({
    books,
    loading
}: {
    books: any[];
    loading: boolean;
}) {

    if (loading) {

        return (

            <div className="absolute top-full mt-2 w-full rounded-lg border bg-background p-4 shadow-lg">

                Loading...

            </div>

        )

    }

    if (books.length === 0) {

        return (

            <div className="absolute top-full mt-2 w-full rounded-lg border bg-background p-4 shadow-lg">

                No books found.

            </div>

        )

    }

    return (

        <div className="absolute top-full z-50 mt-2 max-h-[450px] w-full overflow-y-auto rounded-lg border bg-background shadow-xl">

            {

                books.map((book: any) => (

                    <Link
                        key={book.id}
                        href={`/sh/${book.slug}`}
                        className="flex items-center gap-4 border-b p-3 hover:bg-muted"
                    >

                        <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={45}
                            height={65}
                        />

                        <div className="flex-1">

                            <h3 className="line-clamp-1 font-medium">

                                {book.title}

                            </h3>

                            <p className="text-sm text-muted-foreground">

                                {book.author}

                            </p>

                        </div>

                        <div className="font-semibold">

                            ৳{book.price}

                        </div>

                    </Link>

                ))

            }

        </div>

    )

}