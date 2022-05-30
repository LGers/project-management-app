import { FormFields, FormFieldsObj } from './Auth.types';

export const LOGIN_FORM_FIELDS: FormFields = [
  {
    id: 1,
    name: 'userLogin',
    type: 'text',
    placeholder: 'Login',
  },

  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];

export const SIGNUP_FORM_FIELDS: FormFields = [
  {
    id: 0,
    name: 'userName',
    type: 'text',
    placeholder: 'Your Name',
  },

  ...LOGIN_FORM_FIELDS,

  {
    id: 4,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
  },
];

export const AUTH_FORM_FIELDS_OBJ: FormFieldsObj = {
  USER_NAME: {
    id: 1,
    name: 'userName',
    type: 'text',
    placeholder: 'Your Name',
  },

  USER_LOGIN: {
    id: 2,
    name: 'userLogin',
    type: 'text',
    placeholder: 'Login',
  },

  PASSWORD: {
    id: 3,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },

  CONFIRM_PASSWORD: {
    id: 4,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
  },
};
