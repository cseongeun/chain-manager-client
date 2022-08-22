import { AuthProvider } from '../../config/auth-providers';

export interface ISignInReq {
  provider: AuthProvider;
  email: string;
  password?: string;
}

export interface ISignUpReq {
  email: string;
  name: string;
  password: string;
}

export interface ISignInRes {
  accessToken: string;
}
