import { AuthProvider } from '../../config/auth-providers';
import { INetwork } from '../network/types';
import { IUser } from '../user/types';

export interface ICreateContractExecutionBodyReq {
  chainId: number;
  name: string;
  abi: string;
  address: string;
}

export interface IGetContractExecutionParamReq {
  id: number;
}

export interface IGetContractExecutionQueryReq {
  chainId?: number;
  name?: string;
  address?: string;
}

export interface IContractExecution {
  id: number;
  network: INetwork;
  name: string;
  address: string;
  abi: string;
}

export interface IGetContractExecutionRes {
  success: boolean;
  data: IContractExecution;
}

export interface IGetContractExecutionsRes {
  success: boolean;
  data: IContractExecution[];
}
