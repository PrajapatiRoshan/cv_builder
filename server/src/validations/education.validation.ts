import { z } from 'zod';
import { DegreeListEnum, degreeListEnumType } from '../enums/degree-list.enum';

export const degreeTypeValid = z.enum(
  Object.values(DegreeListEnum) as [degreeListEnumType, ...degreeListEnumType[]]
);

export const dateValid = z
  .string()
  .trim()
  .refine((value) => !value || !isNaN(Date.parse(value)), {
    message: 'Invalid date. Please provide valid details',
  })
  .transform((value) => new Date(value));

export const educationSchemaValid = z.object({
  degreeType: degreeTypeValid,
  institutionName: z.string().trim().min(1).max(255),
  fieldOfStudy: z.string().trim().min(1).max(255),
  startDate: dateValid,
  endDate: dateValid,
  percentage: z.string().trim().min(1).max(255),
  fontSize: z.number().min(1).max(99).optional(),
  fontFamily: z.string().optional(),
  fontColor: z.string().optional(),
});

