import { AuthProvider } from '../../config/auth-providers';

export interface IGetUserQueryReq {
  provider: AuthProvider;
  email: string;
}

export interface IGetUserRes {
  success: boolean;
  data: IUser;
}

export interface IUser {
  email: string;
  name: string;
  provider: AuthProvider;
  image: string;
}
