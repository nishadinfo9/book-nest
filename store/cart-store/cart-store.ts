// src/store/cart.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore } from '@/types/cart.type';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (book) => {
        const cart = get().cart;

        const existing = cart.find((item) => item.book.id === book.id);

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.book.id === book.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          });

          return;
        }

        set({
          cart: [
            ...cart,
            {
              book,
              quantity: 1,
            },
          ],
        });
      },

      removeFromCart: (bookId) => {
        set({
          cart: get().cart.filter((item) => item.book.id !== bookId),
        });
      },

      increaseQuantity: (bookId) => {
        set({
          cart: get().cart.map((item) =>
            item.book.id === bookId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        });
      },

      decreaseQuantity: (bookId) => {
        const cart = get()
          .cart.map((item) =>
            item.book.id === bookId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0);

        set({ cart });
      },

      clearCart: () => set({ cart: [] }),

      isInCart: (bookId) => {
        return get().cart.some((item) => item.book.id === bookId);
      },

      getSubtotal: () => {
        return get().cart.reduce((total, item) => {
          return total + item.book.price * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
      },
    }),
    {
      name: 'booknest-cart',
    },
  ),
);
