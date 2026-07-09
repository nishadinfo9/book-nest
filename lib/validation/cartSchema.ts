import { z } from 'zod';

export const CartSchema = z.object({
  bookId: z.string({message: 'Book ID is required'}),
});

export type CartInput = z.infer<typeof CartSchema>;
