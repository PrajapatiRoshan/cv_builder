import { z } from 'zod';
import { dateValid } from './education.validation';

export const pincodeSchema = z.number().int().min(1).max(999999);

export const userDetailSchemaValid = z.object({
  countryCode: z.number().positive().min(1),
  phone: z.number().positive().min(1),
  address: z.string().trim(),
  city: z.string().trim(),
  state: z.string().trim(),
  pincode: pincodeSchema,
  dob: dateValid,
  summary: z.string().trim(),
  fontSize: z.number().min(1).max(99).optional(),
  fontFamily: z.string().optional(),
  fontColor: z.string().optional(),
});

