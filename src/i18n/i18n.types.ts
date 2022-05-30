export type PageFields = 'title';
export type AuthFields =
  | 'signIn'
  | 'signUp'
  | 'namePlaceholder'
  | 'loginPlaceholder'
  | 'passwordPlaceholder'
  | 'confirmPasswordPlaceholder';

export interface dictionaryFields {
  auth: Record<AuthFields, string>;
  mainPage: Record<PageFields, string>;
  welcomePage: Record<PageFields, string>;
  languageLabel: string;
  welcomePageDictionary: Record<string, string>;
}

export interface WelcomePageDictionary {
  title: string;
}
