'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';

export default function CartSummary() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const shipping = subtotal > 100 ? 0 : 5;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className='sticky top-24 rounded-xl border bg-white p-6'>
      <h2 className='text-lg font-semibold'>Order Summary</h2>

      <Separator className='my-5' />

      <div className='space-y-4 text-sm'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Items</span>

          <span>{totalItems}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Subtotal</span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Shipping</span>

          <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Tax</span>

          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className='my-5' />

      <div className='flex items-center justify-between text-lg font-semibold'>
        <span>Total</span>

        <span>${total.toFixed(2)}</span>
      </div>

      <Button className='mt-6 w-full' size='lg'>
        Proceed to Checkout
      </Button>

      <Button variant='outline' className='mt-3 w-full' asChild>
        <Link href='/shop'>Continue Shopping</Link>
      </Button>
    </div>
  );
}
