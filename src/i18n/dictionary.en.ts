import { authEn } from './auth.dictionary';
import { welcomePageEn } from './welcomePage.dictionary';

export const enTranslation = {
  // auth: {
  //   signIn: 'Sign In',
  //   signUp: 'Sign Up',
  //   namePlaceholder: 'Your Name',
  //   loginPlaceholder: 'Login',
  //   passwordPlaceholder: 'Password',
  //   confirmPasswordPlaceholder: 'Confirm Password',
  // },
  // mainPage: { title: 'Lemasello Main page Title' },
  // welcomePage: { title: 'Welcome to Lemasello' },
  languageLabel: 'Language',
  ...welcomePageEn,
  ...authEn,
};
