'use client';

import { Button } from '@/components/ui/button';
import { createPayment } from '@/http/api';

const CheckoutButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const paymentHandler = async () => {
    try {
      const response = await createPayment({
        paymentMethod: 'BKASH',
        shippingAddress: 'Dhaka',
      });

      window.location.href = response.gatewayUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={paymentHandler}
      className="mt-6 w-full"
      size="lg"
    >
      {children}
    </Button>
  );
};

export default CheckoutButton;