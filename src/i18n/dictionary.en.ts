import { authEn } from './auth.dictionary';
import { page404En } from './page404.dictionary';
import { welcomePageEn } from './welcomePage.dictionary';

export const enTranslation = {
  languageLabel: 'Language',
  ...welcomePageEn,
  ...authEn,
  ...page404En,
};
