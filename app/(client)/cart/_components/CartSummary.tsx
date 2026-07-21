'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CheckoutButton from './CheckoutButton';

interface summaryProps {
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function CartSummary({ summary }: { summary: summaryProps }) {
  const { totalItems, tax, total, shipping, subtotal } = summary;

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

      <CheckoutButton>Proceed to Checkout</CheckoutButton>

      <Button variant='outline' className='mt-3 w-full' asChild>
        <Link href='/shop'>Continue Shopping</Link>
      </Button>
    </div>
  );
}
