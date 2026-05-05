import { z } from "zod"

export const registerSchema = z.object({
    name: z.string({ error: "Name is required" }).min(3, "Name must be at least 3 characters"),
    email: z.string({ error: "Email is required" }).email("Invalid email address"),
    phone_number: z.string({ error: "Phone number is required" }).min(10, "Phone number must be at least 10 digits"),
    password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters"),
})

export const loginSchema = z.object({
    email: z.string({ error: "Email is required" }).email("Invalid email address"),
    password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters"),
})