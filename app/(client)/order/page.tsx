'use client'

import React from 'react';
import CheckoutForm from './_components/CheckoutForm';
import { useParams } from 'next/navigation';

const OrderPage = () => {
  const  bookId  = useParams();
  console.log(bookId)

  return (
    <div>
      OrderPage
      <CheckoutForm bookId={bookId} />
    </div>
  );
};

export default OrderPage;
