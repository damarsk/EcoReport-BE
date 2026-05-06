import { z } from "zod"

export const createCategorySchema = z.object({
    name: z.string({ error: "Name is required" }).min(3, "Name must be at least 3 characters"),
    description: z.string({ error: "Description is required" }).min(10, "Description must be at least 10 characters")
})

export const updateCategorySchema = z.object({
    name: z.string({ error: "Name is required" }).min(3, "Name must be at least 3 characters").optional(),
    description: z.string({ error: "Description is required" }).min(10, "Description must be at least 10 characters").optional()
})