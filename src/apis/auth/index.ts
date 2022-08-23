import { apiInstance } from '../apiInstance';
import { ISignInBodyReq, ISignInRes, ISignUpBodyReq } from './types';

export const api_signIn = async ({
  provider,
  email,
  password,
}: ISignInBodyReq) => {
  const response = await apiInstance().post<ISignInRes>(`/auth/signin`, {
    provider,
    email,
    password,
  });
  return response.data;
};

export const api_signUp = async ({
  provider,
  email,
  name,
  password,
}: ISignUpBodyReq) => {
  const response = await apiInstance().post<ISignInRes>(`/auth/signup`, {
    provider,
    email,
    name,
    password,
  });
  return response.data;
};
