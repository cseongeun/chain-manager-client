/* eslint-disable react-hooks/rules-of-hooks */
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { IMultiTransferHistory } from '../../../apis/multi-transfer/types';
import { INetwork } from '../../../apis/network/types';

const KEY = {
  CREATE_MULTI_TRANSFER_DATA: 'CREATE_MULTI_TRANSFER_DATA',
  CREATE_MULTI_TRANSFER_STEP: 'CREATE_MULTI_TRANSFER_STEP',
};

// Create Execution Contract Data
export type CreateMultiTransferData = {
  network: INetwork;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  memo: string;
  hash: string;
  histories: IMultiTransferHistory[];
  data: [string, number][];
};

const createMultiTransferData = atom<CreateMultiTransferData>({
  key: KEY.CREATE_MULTI_TRANSFER_DATA,
  default: null,
});

export function useCreateMultiTransferData() {
  return useRecoilState(createMultiTransferData);
}

export function resetCreateMultiTransferData() {
  return useResetRecoilState(createMultiTransferData);
}

// Create Execution Contract Step
export type CreateMultiTransferStep = number;

const createMultiTransferStep = atom<CreateMultiTransferStep>({
  key: KEY.CREATE_MULTI_TRANSFER_STEP,
  default: 0,
});

export function useCreateMultiTransferStep() {
  return useRecoilState(createMultiTransferStep);
}

export function resetCreateMultiTransferStep() {
  return useResetRecoilState(createMultiTransferStep);
}
