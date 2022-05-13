import { welcomePageRu } from './welcomePage.dictionary';
import { authRu } from './auth.dictionary';
import { mainPageRu } from './mainPage.dictionary';

export const ruTranslation = {
  languageLabel: 'Язык',
  ...mainPageRu,
  ...welcomePageRu,
  ...authRu,
};
