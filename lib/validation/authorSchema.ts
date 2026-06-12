import * as z from "zod";

export const AuthorSchema = z.object({
  name: z.string().min(2).max(150),
  slug: z.string().min(2).max(150).optional(),
  bio: z.string().optional(),
  image: z.string().url().optional().or(z.literal("")),
  country: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal("")),
  isActive: z.boolean().optional(),
});
