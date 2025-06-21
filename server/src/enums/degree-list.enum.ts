export const DegreeListEnum = {
  HSC: 'HSC',
  SSC: 'SSC',
  Bachelor: 'Bachelor',
  Master: 'Master',
  Phd: 'Phd',
} as const;

export type degreeListEnumType = keyof typeof DegreeListEnum;

