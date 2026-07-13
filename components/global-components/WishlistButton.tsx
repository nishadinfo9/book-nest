'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { addWishlist } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const WishlistButton = ({
  bookId,
  wishlisted,
  className = 'top-2 left-2',
}: {
  bookId: string;
  wishlisted: boolean;
  className?: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['add-wishlist'],
    mutationFn: addWishlist,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['wishlist'],
      });
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      queryClient.invalidateQueries({
        queryKey: ['single-book'],
      });
    },
    onError: (error) => {
      console.error('Failed to update wishlist', error);
    },
  });

  const handleWishlist = async (bookId: string) => {
    console.log('bookId', bookId);
    try {
      mutate(bookId);
    } catch (error) {
      console.error('Wishlist adding error', error);
    }
  };

  return (
    <Button
      disabled={isPending}
      onClick={() => handleWishlist(bookId)}
      size='icon'
      aria-label='Add book to wishlist'
      variant='secondary'
      className={`absolute z-10 h-8 w-8 cursor-pointer rounded-full bg-white/90 shadow-sm backdrop-blur hover:bg-white ${className}`}
    >
      <Heart
        size={16}
        className={`${wishlisted ? 'fill-red-500 hover:text-red-500' : ''}`}
      />
    </Button>
  );
};

export default WishlistButton;
