export type AuthInputName = 'userName' | 'userLogin' | 'password' | 'confirmPassword';
export type radioProps = 'id' | 'value';

export interface Field {
  id: number;
  name: AuthInputName;
  type: 'text' | 'password';
  placeholder: string;
}

export type FormFieldsKeys = 'USER_NAME' | 'USER_LOGIN' | 'PASSWORD' | 'CONFIRM_PASSWORD';

export type FormFieldsObj = Record<FormFieldsKeys, Field>;
export type FormFields = Array<Field>;

export interface SignInFormInputs {
  userLogin: string;
  password: string;
}
export interface SignUpFormInputs extends SignInFormInputs {
  userName: string;
  confirmPassword: string;
}

export type FormNameType = 'signIn' | 'signUp' | 'singOut';

export interface FormNameInterface {
  formName: FormNameType;
}

export interface FormData {
  name: '';
  fields: JSX.Element[];
}
