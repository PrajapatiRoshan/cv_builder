export const CvTemplateIdEnum = {
  ONEPAGEFORMATE: 'onePageFormate',
  TWOCOLFORMATE: 'twocolformate',
} as const;

export type cvTemplateIdEnumType =
  (typeof CvTemplateIdEnum)[keyof typeof CvTemplateIdEnum];

