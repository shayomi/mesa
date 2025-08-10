import * as z from "zod";

export const businessFormSchema = z.object({
  businessName: z
    .string()
    .min(3, "Business name must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters")
    .optional(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters")
    .optional(),
  imageUrl: z.string().url("Must be a valid image URL"),
  industryId: z.string().min(1, "Industry is required"),
  targetAudience: z.string().optional(),
  goals: z.string().min(3, "Goals must be at least 3 characters"),
  companySize: z.string().min(1, "Company size is required"),
  region: z
    .array(z.string().min(1, "Region name cannot be empty"))
    .min(1, "Select at least one region"),
  painPoint: z.string().optional(),
  targetMarket: z
    .array(z.string().min(1, "Target market entry cannot be empty"))
    .min(1, "Select at least one target market"),
});
