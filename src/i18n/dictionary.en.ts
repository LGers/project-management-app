import { authEn } from './auth.dictionary';
import { welcomePageEn } from './welcomePage.dictionary';
import { mainPageEn } from './mainPage.dictionary';

export const enTranslation = {
  languageLabel: 'Language',
  ...mainPageEn,
  ...welcomePageEn,
  ...authEn,
};
