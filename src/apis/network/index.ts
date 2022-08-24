import { apiInstanceWithToken } from '../apiInstance';
import { IGetNetworkQueryReq, IGetNetworkQueryRes } from './types';

export const api_getNetworks = async (
  accessToken: string,
  { chainId, name, testnet }: IGetNetworkQueryReq
) => {
  const response = await apiInstanceWithToken(
    accessToken
  ).get<IGetNetworkQueryRes>(`/network`, {
    params: {
      chainId,
      name,
      testnet,
    },
  });
  return response.data;
};
