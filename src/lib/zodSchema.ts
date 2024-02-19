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
