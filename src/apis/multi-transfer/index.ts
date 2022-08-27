import { apiInstanceWithToken } from '../apiInstance';
import {
  ICreateMultiTransferBodyReq,
  IGetMultiTransferQueryReq,
  IGetMultiTransferRes,
  IMultiTransfer,
} from './types';

export const api_createMultiTransfer = async (
  accessToken: string,
  {
    chainId,
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    memo,
    hash,
    histories,
  }: ICreateMultiTransferBodyReq
) => {
  const response = await apiInstanceWithToken(
    accessToken
  ).post<IGetMultiTransferRes>(`/transfer/multi`, {
    chainId,
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    memo,
    hash,
    histories,
  });

  return response.data;
};

export const api_getMultiTransfers = async (
  accessToken: string,
  { chainId, tokenAddress, hash }: IGetMultiTransferQueryReq
) => {
  const response = await apiInstanceWithToken(
    accessToken
  ).get<IGetMultiTransferRes>(`/transfer/multi`, {
    params: {
      chainId,
      tokenAddress,
      hash,
    },
  });
  return response.data;
};
