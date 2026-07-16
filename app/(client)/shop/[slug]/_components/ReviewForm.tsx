'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RHFInput from '@/components/global-components/RHFInput';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '@/http/api';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ReviewFormSchema } from '@/lib/validation/reviewSchema';

export type ReviewFormValue = z.input<typeof ReviewFormSchema>;

export default function ReviewForm({ bookId }: { bookId: string }) {
  console.log('bookId', bookId);
  const queryClient = useQueryClient();
  const { register, control, reset, handleSubmit } = useForm<ReviewFormValue>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 5,
      comment: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-review', bookId],
    mutationFn: createReview,
    onSuccess: (data) => {
      console.log('review data', data);
      reset();
      queryClient.invalidateQueries({
        queryKey: ['reviews', bookId],
      });
    },

    onError: (error) => {
      console.log(error.message || 'Something went wrong.');
    },
  });

  const onSubmit = (formValue: ReviewFormValue) => {

    const formData = new FormData();
    formData.append('rating', String(formValue.rating));
    formData.append('comment', formValue.comment);
    formData.append('bookId', bookId);
    formData.append('image', formValue.image);
    mutate(formData);
  };

  return (
    <section className='mx-auto mt-16 w-2xl rounded-xl border p-8'>
      <h2 className='text-2xl font-bold'>Write a Review</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
        <RHFInput
          name='rating'
          control={control}
          label='Rating'
          type='number'
          placeholder='5'
        />

        <div className='space-y-3'>
          <Label htmlFor='comment'>Comment</Label>
          <Textarea
            id='comment'
            {...register('comment')}
            rows={5}
            placeholder='Share your thoughts...'
          />
        </div>

        <RHFInput
          name='image'
          control={control}
          label='upload image'
          type='file'
          placeholder='upload image'
        />

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </section>
  );
}
