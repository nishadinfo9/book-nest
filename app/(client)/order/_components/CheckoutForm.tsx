'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RHFInput from '@/components/global-components/RHFInput';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrdersInput, OrdersSchema } from '@/lib/validation/orderSchema';
import { createOrder } from '@/http/api';

export default function CheckoutForm({ bookId }: { bookId: string }) {
  console.log('bookId', bookId);
  const queryClient = useQueryClient();
  const { register, control, reset, handleSubmit } = useForm<OrdersInput>({
    resolver: zodResolver(OrdersSchema),
    defaultValues: {
      paymentMethod: '',
      shippingAddress: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-order', bookId],
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log('order data', data);
      reset();
      queryClient.invalidateQueries({
        queryKey: ['orders', bookId],
      });
    },

    onError: (error) => {
      console.log(error.message || 'Something went wrong.');
    },
  });

  const onSubmit = (data: OrdersInput) => {
    console.log(data);
  };

  return (
    <section className='mx-auto my-5 w-2xl rounded-xl border p-8'>
  

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
        <RHFInput
          name='paymentMethod'
          control={control}
          label='Payment Method'
          type='text'
          placeholder='BKASH'
        />
        <RHFInput
          name='shippingAddress'
          control={control}
          label='Shipping Address'
          type='text'
          placeholder='7597, Dhaka, Bangladesh'
        />

        <div className='space-y-3'>
          <Label htmlFor='Notes'>Notes</Label>
          <Textarea
            id='Notes'
            {...register('notes')}
            rows={3}
            placeholder='Add notes...'
          />
        </div>

        <Button className='w-full' type='submit' disabled={isPending}>
          {isPending ? 'Ordering...' : 'Orders'}
        </Button>
      </form>
    </section>
  );
}
