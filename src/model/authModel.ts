export interface LoginModel {
  email: string;
  password: string;
}

export interface ResetPasswordModel {
  email: string;
  token: string;
  password: string;
}
