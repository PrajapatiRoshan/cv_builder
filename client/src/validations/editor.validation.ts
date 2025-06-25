import * as Yup from 'yup';

export const userDetailSchemaValidation = Yup.object({
  address: Yup.string().required('Address is required'),
  countryCode: Yup.number()
    .integer()
    .positive()
    .min(1)
    .required('Country code is required'),
  phone: Yup.number().integer().positive().required('Phone number is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.number().integer().min(1).max(999999).required('Pincode is required'),
  dob: Yup.string().required('Date of birth is required'),
  fontSize: Yup.number().min(1).max(99).optional(),
  fontFamily: Yup.string().optional(),
  fontColor: Yup.string().optional(),
  summary: Yup.string().required('Summary is required'),
});

export const educationSchemaValidation = Yup.object().shape({
  degreeType: Yup.string().required('Degree type is required'),
  institutionName: Yup.string().required('Institution name is required'),
  fieldOfStudy: Yup.string().required('Field of study is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  percentage: Yup.string().required('Percentage is required'),
  fontSize: Yup.number().optional(),
  fontFamily: Yup.string().optional(),
  fontColor: Yup.string().optional(),
});

export const workExperienceSchemaValidation = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  joinLocation: Yup.string().required('Location is required'),
  jobTitle: Yup.string().required('Job title is required'),
  ctc: Yup.number()
    .typeError('CTC must be a number')
    .required('CTC is required')
    .min(0, 'CTC must be greater than or equal to 0'),
  joinDate: Yup.date().required('Joining date is required'),
  leaveDate: Yup.date()
    .required('Leaving date is required')
    .min(Yup.ref('joinDate'), 'Leave date cannot be before join date'),
  techStack: Yup.string()
    .required('Tech stack is required')
    .test(
      'is-valid-tech-stack',
      'Tech stack must be a comma-separated list of values',
      (value) => {
        if (!value) return false;
        const techArray = value.split(',').map((item) => item.trim());
        return techArray.length > 0 && techArray.every((item) => item.length > 0);
      }
    ),
  description: Yup.string().required('Description is required'),
  fontSize: Yup.number().optional(),
  fontFamily: Yup.string().optional(),
  fontColor: Yup.string().optional(),
});

export const skillSchemaValidation = Yup.object().shape({
  skillName: Yup.string().required('Skill name is required'),
  skillLevel: Yup.number()
    .required('Skill level is required')
    .min(1, 'Minimum level is 1')
    .max(5, 'Maximum level is 5'),
  experienceYears: Yup.number()
    .required('Experience years is required')
    .min(0, 'Experience must be at least 0'),
  fontSize: Yup.number().optional(),
  fontFamily: Yup.string().optional(),
  fontColor: Yup.string().optional(),
});

export const projectSchemaValidation = Yup.object().shape({
  projectName: Yup.string().required('Project name is required'),
  projectUrl: Yup.string().url('Must be a valid URL').required('Project URL is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  techStack: Yup.string()
    .required('Tech stack is required')
    .test(
      'is-valid-tech-stack',
      'Tech stack must be a comma-separated list of values',
      (value) => {
        if (!value) return false;
        const techArray = value.split(',').map((item) => item.trim());
        return techArray.length > 0 && techArray.every((item) => item.length > 0);
      }
    ),
  fontSize: Yup.number().optional(),
  fontFamily: Yup.string().optional(),
  fontColor: Yup.string().optional(),
});
