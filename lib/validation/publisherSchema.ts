import * as z from "zod";

export const PublisherSchema = z.object({
  name: z.string().min(2).max(150),
  isActive: z.boolean().optional(),
  logo: z.string().optional(),
  website: z.string().optional()
});
