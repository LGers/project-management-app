import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  userName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required')
    .min(2, 'Must be 2 characters or more'),
  userLogin: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required')
    .min(2, 'Must be 2 characters or more'),
  password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
  confirmPassword: Yup.string()
    .required('Required')
    .min(6, 'Must be 6 characters or more')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const signInValidationSchema = Yup.object({
  userLogin: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required')
    .min(2, 'Must be 2 characters or more'),
  password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
});
