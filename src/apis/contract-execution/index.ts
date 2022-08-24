import { apiInstanceWithToken } from '../apiInstance';
import {
  IContractExecution,
  ICreateContractExecutionBodyReq,
  IGetContractExecutionQueryReq,
  IGetContractExecutionsRes,
} from './types';

export const api_createContractExecution = async (
  accessToken: string,
  { chainId, name, abi, address }: ICreateContractExecutionBodyReq
) => {
  const response = await apiInstanceWithToken(
    accessToken
  ).post<IContractExecution>(`/contract/execution`, {
    chainId,
    name,
    abi,
    address,
  });

  return response.data;
};

export const api_getContractExecutions = async (
  accessToken: string,
  { chainId, name, address }: IGetContractExecutionQueryReq
) => {
  const response = await apiInstanceWithToken(
    accessToken
  ).get<IGetContractExecutionsRes>(`/contract/execution`, {
    params: {
      chainId,
      name,
      address,
    },
  });
  return response.data;
};
