import { EDITOR_ROUTES } from '@/routes/common/routesPath';

export const fontOptions = [
  'Arial',
  'Roboto',
  'Helvetica',
  'Times New Roman',
  'Courier New',
] as const;

export const TABLIST = [
  { label: 'Basic Details', path: EDITOR_ROUTES.USERDETAIL },
  { label: 'Education', path: EDITOR_ROUTES.EDUCATION },
  { label: 'Experience', path: EDITOR_ROUTES.EXPERIENCE },
  { label: 'Skills', path: EDITOR_ROUTES.SKILLS },
  { label: 'Projects', path: EDITOR_ROUTES.PROJECT },
] as const;

export const initialEducation = {
  degreeType: '',
  institutionName: '',
  fieldOfStudy: '',
  startDate: new Date(),
  endDate: new Date(),
  percentage: '',
  fontSize: 14,
  fontFamily: 'Arial',
  fontColor: '#333333',
} as const;

export const initialExperience = {
  companyName: '',
  joinLocation: '',
  jobTitle: '',
  ctc: '',
  joinDate: new Date(),
  leaveDate: new Date(),
  techStack: '',
  description: '',
  fontSize: 14,
  fontFamily: 'Arial',
  fontColor: '#333333',
} as const;

export const initialProject = {
  projectName: '',
  projectUrl: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  techStack: '',
  fontSize: 14,
  fontFamily: 'Arial',
  fontColor: '#333333',
} as const;

export const initialSkill = {
  skillName: '',
  skillLevel: 1,
  experienceYears: 0,
  fontSize: 14,
  fontFamily: 'Arial',
  fontColor: '#333333',
} as const;

export const initialValues = {
  address: '',
  countryCode: 91,
  phone: '',
  city: '',
  state: '',
  pincode: '',
  dob: new Date(),
  fontSize: 16,
  fontFamily: 'Arial',
  fontColor: '',
  summary: '',
} as const;

