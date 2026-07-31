import * as z from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2).max(150),
  slug: z.string().min(2).max(150).optional(),
  isActive: z.boolean().optional(),
});
