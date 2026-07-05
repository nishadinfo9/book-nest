// src/types/cart.type.ts

import { BookType } from "./book.type";

export interface CartItem {
  book: BookType;
  quantity: number;
}

export interface CartStore {
  cart: CartItem[];
  addToCart: (book: BookType) => void;
  removeFromCart: (bookId: string) => void;
  increaseQuantity: (bookId: string) => void;
  decreaseQuantity: (bookId: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
  getSubtotal: () => number;
  getTotalItems: () => number;
}