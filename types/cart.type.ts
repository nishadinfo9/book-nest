import { BookType } from "./book.type";

export interface CartType {
  id: string;
  book: BookType;
  quantity: number;
  title: string;
  coverImage: string;
  price: number;
  slug: string;
  averageRating: number;
  discountPrice: number;
  author: string; 
}