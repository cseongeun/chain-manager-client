import { AuthProvider } from '../../config/auth-providers';
import { IUser } from '../user/types';

export interface ISignInBodyReq {
  provider: AuthProvider;
  email: string;
  password?: string;
}

export interface ISignUpBodyReq {
  provider: AuthProvider;
  email: string;
  name: string;
  password?: string;
}

export interface ISignInUser extends IUser {
  accessToken: string;
}

export interface ISignInRes {
  success: boolean;
  data: ISignInUser;
}
