import { useSession } from 'next-auth/react';
import { apiInstance, apiInstanceWithToken } from '../apiInstance';
import { IGetUserQueryReq, IGetUserRes } from './types';

export const api_getUser = async ({ provider, email }: IGetUserQueryReq) => {
  const response = await apiInstance().get<IGetUserRes>(`/user`, {
    params: {
      provider,
      email,
    },
  });

  return response.data;
};

export const api_getProfile = async (accessToken: string) => {
  const response = await apiInstanceWithToken(accessToken).get<IGetUserRes>(
    '/user/profile'
  );
  return response.data;
};
