import { z } from 'zod';

export const projectNameValid = z.string().trim().min(1).max(255);

export const projectUrlValid = z
  .string()
  .trim()
  .url()
  .max(2048)
  .refine((url) => url.startsWith('https://'), {
    message: 'URL must start with https://',
  })
  .optional();

export const descriptionValid = z.string().trim();

export const startDateValid = z
  .string()
  .trim()
  .refine((value) => !value || !isNaN(Date.parse(value)), {
    message: 'Invalid date. please provide valide details',
  })
  .transform((value) => new Date(value));

export const endDateValid = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || !isNaN(Date.parse(value)), {
    message: 'Invalid date. please provide valide details',
  })
  .transform((value) => (value ? new Date(value) : undefined));

export const techStackValid = z.array(
  z.string().trim().min(1, { message: "Technology name can't be empty" })
);

export const projectSchemaValid = z.object({
  projectName: projectNameValid,
  projectUrl: projectUrlValid,
  description: descriptionValid,
  startDate: startDateValid,
  endDate: endDateValid,
  techStack: techStackValid,
  fontSize: z.number().min(1).max(99).optional(),
  fontFamily: z.string().optional(),
  fontColor: z.string().optional(),
});

