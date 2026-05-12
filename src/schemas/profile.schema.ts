import { z } from "zod"

export const updateProfileSchema = z.object({
    profile_picture: z.string().optional(),
    bio: z.string().max(500).optional()
}).refine((data) => Object.values(data).some(value => value !== undefined), {
    path: ["profile_picture", "bio"],
    message: "At least one field must be provided"
})