import * as z from "zod";

export const AuthorSchema = z.object({
  name: z.string().min(2).max(150),
  slug: z.string().min(2).max(150).optional(),
  bio: z.string(),
  image: z.file().optional(),
  country: z.string().max(100).optional(),
  website: z.string().url().or(z.literal("")),
  isActive: z.boolean().default(true).optional(),
});
