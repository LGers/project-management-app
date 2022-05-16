import { welcomePageRu } from './welcomePage.dictionary';
import { mainHeaderRu } from './mainHeader.dictionary';
import { authRu } from './auth.dictionary';
// import { mainPageRu } from './mainPage.dictionary';
// import { page404Ru } from './page404.dictionary';
import { mainPageRu } from './mainPage.dictionary';
import { page404Ru } from './page404.dictionary';

export const ruTranslation = {
  languageLabel: 'Язык',
  ...mainPageRu,
  ...welcomePageRu,
  ...mainHeaderRu,
  ...authRu,
  ...page404Ru,
};
