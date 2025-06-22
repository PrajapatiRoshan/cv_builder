import { z } from 'zod';

export const skillNameValid = z.string().trim().min(1).max(255);

export const skillLevelValid = z.number().positive().min(1).max(5);

export const experienceYearsValid = z.number().positive().min(0);

export const skillSchemaValid = z.object({
  skillName: skillNameValid,
  skillLevel: skillLevelValid,
  experienceYears: experienceYearsValid,
});

