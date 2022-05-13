import { welcomePageRu } from './welcomePage.dictionary';
import { authRu } from './auth.dictionary';
import { page404Ru } from './page404.dictionary';

export const ruTranslation = {
  languageLabel: 'Язык',
  ...welcomePageRu,
  ...authRu,
  ...page404Ru,
};
