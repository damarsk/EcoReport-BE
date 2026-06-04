import { z } from "zod";

export const createQuestionSchema = z.object({
  fullName: z
    .string({ error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters"),
  question: z
    .string({ error: "Question is required" })
    .min(10, "Question must be at least 10 characters"),
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address"),
});
