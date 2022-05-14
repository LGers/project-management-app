import { welcomePageRu } from './welcomePage.dictionary';
import { authRu } from './auth.dictionary';
import { mainPageRu } from './mainPage.dictionary';
import { page404Ru } from './page404.dictionary';

export const ruTranslation = {
  languageLabel: 'Язык',
  ...mainPageRu,
  ...welcomePageRu,
  ...authRu,
  ...page404Ru,
};
