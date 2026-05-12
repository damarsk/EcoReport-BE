import { z } from "zod"

export const updateProfileSchema = z.object({
    bio: z.string().max(500).optional()
}).refine((data) => Object.values(data).some(value => value !== undefined), {
    path: ["bio"],
    message: "At least one field must be provided"
})