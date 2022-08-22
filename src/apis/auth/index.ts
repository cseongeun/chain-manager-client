import apiInstance from '../apiInstance';
import { ISignInReq, ISignInRes } from './types';

// export const postSignUp = async (params) => {
//   const response = await apiInstance('auth/signin', params);
// };

export const api_signIn = async ({ provider, email, password }: ISignInReq) => {
  const response = await apiInstance().post<ISignInRes>(`/auth/signin`, {
    provider,
    email,
    password,
  });
  return response.data;
};
