import WishlistButton from "@/components/global-components/WishlistButton";
import { BookType } from "@/types/book.type";
import Image from "next/image";

export default function BookGallery({
  book,
}: {
  book: BookType;
}) {
  return ( 
    <div className="rounded-xl border p-6 relative overflow-hidden">

      <Image
        src={book?.coverImage || "/book-placeholder.png"}
        alt="Book"
        width={450}
        height={650}
        className="w-full rounded-lg object-cover"
      />
        <WishlistButton wishlisted={book?.wishlisted} bookId={book.id} className="top-8 right-8"/>

    </div>
  );
}