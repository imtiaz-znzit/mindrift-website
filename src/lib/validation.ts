import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  workEmail: z
    .string()
    .trim()
    .email("Please provide a valid work email address")
    .max(150, "Email address is too long"),
  companyName: z
    .string()
    .trim()
    .min(1, "Company or organization name is required")
    .max(120, "Company name cannot exceed 120 characters"),
  projectType: z.string().min(1, "Please select a project category"),
  estimatedBudget: z.string().optional().default(""),
  projectTimeline: z.string().optional().default(""),
  projectDescription: z
    .string()
    .trim()
    .min(5, "Please provide at least 5 characters describing your project")
    .max(5000, "Project description cannot exceed 5000 characters"),
  privacyConsent: z.boolean().optional().default(true),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
