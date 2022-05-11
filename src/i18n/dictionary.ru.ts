import { welcomePageRu } from './welcomePage.dictionary';
import { authRu } from './auth.dictionary';

export const ruTranslation = {
  // auth: {
  //   signIn: 'Логин',
  //   signUp: 'Регистрация',
  //   namePlaceholder: 'Ваше Имя',
  //   loginPlaceholder: 'Логин',
  //   passwordPlaceholder: 'Пароль',
  //   confirmPasswordPlaceholder: 'Подтвердите Пароль',
  // },
  // mainPage: { title: 'Lemasello Главная страница' },
  // welcomePage: { title: 'Добро пожаловать в Lemasello' },
  languageLabel: 'Язык',
  ...welcomePageRu,
  ...authRu,
};
