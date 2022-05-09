export interface LoginInterface {
  login: string;
  password: string;
}

export interface SignUpInterface extends LoginInterface {
  name: string;
}
