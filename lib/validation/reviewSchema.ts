import { z } from 'zod';

export const ReviewFormSchema = z.object({
  comment: z
    .string()
    .min(1, 'Comment is required') // Fixed label from Title to Comment
    .max(255, 'Comment must not exceed 255 characters'),

  rating: z.coerce
    .number('Rating must be a number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5'),

  image: z.file().optional(),

});


export const ReviewFormSchemaBackend = z.object({
  comment: z
    .string()
    .min(1, 'Comment is required') // Fixed label from Title to Comment
    .max(255, 'Comment must not exceed 255 characters'),

  rating: z.coerce
    .number('Rating must be a number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5'),

  bookId: z.string().min(1, 'Book ID is required'),
});