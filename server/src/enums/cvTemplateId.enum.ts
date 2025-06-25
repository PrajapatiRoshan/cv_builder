export const CvTemplateIdEnum = {
  ONEPAGEFORMATE: 'onePageFormate',
  TWOCOLFORMATE: 'twocolformate',
  TEMPLATE1: 'template1',
  TEMPLATE2: 'template2',
  TEMPLATE3: 'template3',
  TEMPLATE4: 'template4',
} as const;

export type cvTemplateIdEnumType =
  (typeof CvTemplateIdEnum)[keyof typeof CvTemplateIdEnum];

