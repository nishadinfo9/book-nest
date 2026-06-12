import * as z from 'zod'

export const UserRoleEnum = z.enum([
  "CUSTOMER",
  "ADMIN",
  "SELLER",
]);

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(255),
  image: z
    .string()
    .url("Invalid image URL")
    .optional()
    .nullable(),
});
export type RegisterInput =
  z.infer<typeof RegisterSchema>;


export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password minimum 8 characters")

});

export type LoginInput =
  z.infer<typeof LoginSchema>;