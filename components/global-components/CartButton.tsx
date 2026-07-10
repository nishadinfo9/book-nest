import React from 'react';
import { Button } from '../ui/button';
import { createCart } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartButtonProps {
  variant?:
    'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  bookId?: string;
}

const CartButton = ({
  variant,
  size,
  className,
  children,
  bookId,
}: CartButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: (bookId: string) => createCart(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  const addToCartHandler = async () => {
    mutation.mutate(bookId as string);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={  addToCartHandler}
    >
      {children}
    </Button>
  );
};

export default CartButton;
