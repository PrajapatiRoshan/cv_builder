export const CvTemplateIdEnum = {
  ONEPAGEFORMATE: 'onePageFormate',
  TWOCOLFORMATE: 'twocolformate',
} as const;

export type cvTemplateIdEnumType = keyof typeof CvTemplateIdEnum;

