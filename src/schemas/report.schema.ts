import { z } from "zod";

export const createReportSchema = z.object({
  category: z.coerce
    .number({ error: "Category is required" })
    .int({ error: "Category is required" })
    .min(1, "Category is required"),
  title: z
    .string({ error: "Title is required" })
    .min(5, "Title must be at least 5 characters"),
  description: z
    .string({ error: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  provinsi: z.string({ error: "Provinsi is required" }),
  kabupaten: z.string({ error: "Kabupaten is required" }),
  kecamatan: z.string({ error: "Kecamatan is required" }),
  desa: z.string({ error: "Desa is required" }),
  incident_date: z.coerce.date({ error: "Incident date is required" }),
  attachments: z.array(z.string()).optional(),
});
