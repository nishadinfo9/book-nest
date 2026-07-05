import { useCartStore } from "@/store/cart-store/cart-store";

export const useCart = () => {
  return useCartStore();
};