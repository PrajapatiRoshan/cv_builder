import { z } from 'zod';
import { CvTemplateIdEnum } from '../enums/cvTemplateId.enum';

export const emailSchemaValid = z
  .string()
  .trim()
  .email('Invalid email address')
  .min(1)
  .max(255);

export const passwordSchemaValid = z.string().trim().min(8).max(255);

export const cvTemplateIdValid = z
  .enum(Object.values(CvTemplateIdEnum) as [string, ...string[]])
  .optional();

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: emailSchemaValid,
  password: passwordSchemaValid,
  cvTemplateId: cvTemplateIdValid,
});

export const loginSchema = z.object({
  email: emailSchemaValid,
  password: passwordSchemaValid,
});

