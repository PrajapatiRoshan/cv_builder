import { z } from 'zod';
import { descriptionValid, techStackValid } from './project.validation';

export const companyNameValid = z.string().trim().min(1).max(255);

export const joinLocationValid = z.string().trim().min(1).max(100);

export const jobTitleValid = z.string().trim().min(1).max(100);

export const ctcValid = z.number().positive().min(1);

export const joinDateValid = z
  .string()
  .trim()
  .refine((value) => !value || !isNaN(Date.parse(value)), {
    message: 'Invalid date. please provide valide details',
  })
  .transform((value) => new Date(value));

export const leaveDateValid = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || !isNaN(Date.parse(value)), {
    message: 'Invalid date. Please provide valid details',
  })
  .transform((value) => (value ? new Date(value) : undefined));

export const experienceSchemaValid = z.object({
  companyName: companyNameValid,
  joinLocation: joinLocationValid,
  jobTitle: jobTitleValid,
  ctc: ctcValid,
  joinDate: joinDateValid,
  leaveDate: leaveDateValid,
  techStack: techStackValid,
  description: descriptionValid,
  fontSize: z.number().min(1).max(99).optional(),
  fontFamily: z.string().optional(),
  fontColor: z.string().optional(),
});

