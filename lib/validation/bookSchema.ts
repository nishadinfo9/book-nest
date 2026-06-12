import * as z  from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters"),

  isbn13: z
    .string()
    .max(20, "ISBN13 must not exceed 20 characters")
    .optional(),

  publisherId: z
    .string({message: 'publisherId is required'})
    .uuid("Invalid publisher ID"),

  authorId: z
    .string({message: 'authorId is required'})
    .uuid("Invalid author ID"),

  language: z
    .string()
    .max(10, "Language code must not exceed 10 characters")
    .default("EN"),

  price: z
    .coerce
    .number()
    .positive("Price must be greater than 0"),

  coverImage: z
    .string()
    .url("Invalid cover image URL")
    .optional(),

  description: z
    .string()
    .optional(),

  categoryId: z
    .string({message: 'categoryId is required'})
    .uuid("Invalid category ID"),
});

export type BookInput = z.infer<typeof bookSchema>;
