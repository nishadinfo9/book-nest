import WishlistButton from "@/components/global-components/WishlistButton";
import { BookType } from "@/types/book.type";
import Image from "next/image";

export default function BookGallery({
  book,
}: {
  book: BookType;
}) {
  return ( 
<div className="mx-auto book">
  <Image
    src={book?.coverImage || "/book-placeholder.png"}
    alt="Book"
    width={600}
    height={600}
    className=" w-72 mx-auto h-full block "
  />

  <WishlistButton
    wishlisted={book?.wishlisted}
    bookId={book.id}
    className="absolute top-3 right-3"
  />
</div>
  );
}