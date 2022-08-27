import { AuthProvider } from '../../config/auth-providers';
import { INetwork } from '../network/types';
import { IUser } from '../user/types';

export interface IMultiTransferHistory {
  from: string;
  to: string;
  amount: string;
}

export interface ICreateMultiTransferBodyReq {
  chainId: number;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  totalAddress: number;
  totalAmount: string;
  memo: string;
  hash: string;
  histories: IMultiTransferHistory[];
}

export interface IMultiTransfer {
  id: number;
  network: INetwork;
  hash: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  totalAddress: number;
  totalAmount: string;
  memo: string;
  histories: IMultiTransferHistory[];
}

export interface IGetMultiTransferRes {
  success: boolean;
  data: IMultiTransfer;
}

export interface IGetMultiTransferQueryReq {
  chainId?: number;
  tokenAddress?: string;
  tokenSymbol?: string;
  hash?: string;
}
