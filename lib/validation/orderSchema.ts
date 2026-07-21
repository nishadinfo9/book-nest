import { number, string, z } from 'zod';

export const OrdersSchema = z.object({
  userId: z.string({ message: 'Book ID is required' }),
  status: string(),
  totalAmount: number(),
  paymentStatus: string(),
  paymentMethod: string(),
  shippingAddress: string(),
  notes: string().optional()
});

export type OrdersInput = z.infer<typeof OrdersSchema>;
