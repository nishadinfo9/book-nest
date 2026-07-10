'use client';

import CartItem from './_components/CartItem';
import CartSummary from './_components/CartSummary';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/http/api';
import { CartType } from '@/types/cart.type';

export default function CartPage() {

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <h2 className='text-2xl font-semibold'>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <section className='mx-auto max-w-7xl px-6 py-10'>
      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='space-y-5 lg:col-span-2'>
          {cart.items.map((item: CartType) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary summary={cart.summary} />
      </div>
    </section>
  );
}
