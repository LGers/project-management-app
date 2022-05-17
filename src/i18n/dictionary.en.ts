import { authEn } from './auth.dictionary';
import { page404En } from './page404.dictionary';
import { welcomePageEn } from './welcomePage.dictionary';
import { mainPageEn } from './mainPage.dictionary';
import { taskEn } from './task.dictionary';

export const enTranslation = {
  languageLabel: 'Language',
  ...mainPageEn,
  ...welcomePageEn,
  ...authEn,
  ...page404En,
  ...taskEn,
};
