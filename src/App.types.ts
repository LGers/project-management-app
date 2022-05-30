import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export type ProtectedRouteProps = {
  isAuth: boolean;
  children: ReactJSXElement;
};
