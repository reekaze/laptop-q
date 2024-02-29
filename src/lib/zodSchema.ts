import { z } from "zod";
export const registerFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" }),
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const addProductFormSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  brand: z.string().min(1, { message: "Brand must be at least 1 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters" }),

  images: z
    .string()
    .url({ message: "Invalid Image Url" })
    .array()
    .min(1, { message: "Image must be at least 1" }),
});

export const addCartFormSchema = z.object({
  productVariantId: z.string().min(1, {
    message: "Product Variant ID must be at least 1 character",
  }),
  quantity: z
    .number()
    .int({
      message: "Quantity mus be Integer",
    })
    .min(1, {
      message: "Quantity must be at least 1",
    }),
});

export const deleteCartFormSchema = z.object({
  cartItemId: z.string().min(1, {
    message: "Product Variant ID must be at least 1 character",
  }),
});
