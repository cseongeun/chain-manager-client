export interface INetwork {
  id: number;
  name: string;
  chainId: number;
  testnet: boolean;
  explorer: string;
}

export interface IGetNetworkQueryReq {
  chainId?: number;
  name?: string;
  testnet?: boolean;
}

export interface IGetNetworkQueryRes {
  success: boolean;
  data: INetwork[];
}
