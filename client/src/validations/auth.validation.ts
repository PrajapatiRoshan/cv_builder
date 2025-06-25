import * as Yup from 'yup';
export const loginSchemaValidate = Yup.object({
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Please enter email. Required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be minimum 8 characters!')
    .required('Please enter password. Required!'),
});

export const signUpSchemaValidate = loginSchemaValidate.shape({
  name: Yup.string().trim().required('Please enter your name. Required!'),
});
