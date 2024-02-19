import { z } from "zod";
export const formRegisterSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" }),
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const formAddProductSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters" }),
  prices: z
    .number()
    .min(0, {
      message: "Price must be at least 0.01",
    })
    .multipleOf(0.01, {
      message: "Price maximum have 2 decimals",
    })
    .array()
    .min(1, { message: "Price must be at least 1" }),
  quantities: z
    .number()
    .min(1, {
      message: "Price must be at least 1",
    })

    .array()
    .min(1, { message: "Price must be at least 1" }),
  images: z
    .string()
    .url({ message: "Invalid Image Url" })
    .array()
    .min(1, { message: "Image must be at least 1" }),
});
