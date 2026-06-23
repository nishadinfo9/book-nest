import { z } from "zod";

export const InventorySchema = z.object({
  id: z.string().uuid().optional(),

  bookId: z
    .string({ message: "bookId is required" })
    .uuid("Invalid bookId"),

  availableStock: z
    .number({ message: "availableStock must be a number" })
    .int("availableStock must be an integer")
    .min(0, "availableStock cannot be negative")
    .default(0),

  reservedStock: z
    .number()
    .int()
    .min(0)
    .default(0),

  soldStock: z
    .number()
    .int()
    .min(0),

  updatedAt: z.date().optional(),
});

export const CreateInventorySchema = z.object({
  bookId: z.string().uuid("Invalid bookId"),

  availableStock: z
    .number()
    .int()
    .min(0)
});

export const UpdateInventorySchema = z.object({
  availableStock: z.number().int().min(0).optional(),

  reservedStock: z.number().int().min(0).optional(),

  soldStock: z.number().int().min(0).optional(),
});