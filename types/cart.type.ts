// src/types/cart.type.ts

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

export interface CartStore {
  cart: CartType[];
  addToCart: (book: BookType) => void;
  removeFromCart: (bookId: string) => void;
  increaseQuantity: (bookId: string) => void;
  decreaseQuantity: (bookId: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
  getSubtotal: () => number;
  getTotalItems: () => number;
}