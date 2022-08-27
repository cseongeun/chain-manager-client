/* eslint-disable react-hooks/rules-of-hooks */
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { INetwork } from '../../../apis/network/types';

const KEY = {
  CREATE_CONTRACT_EXECUTION_DATA: 'CREATE_CONTRACT_EXECUTION_DATA',
  CREATE_CONTRACT_EXECUTION_STEP: 'CREATE_CONTRACT_EXECUTION_STEP',
};

// Create Execution Contract Data
export type CreateContractExecutionData = {
  network: INetwork;
  name: string;
  address: string;
  abi: string;
};

const createContractExecutionData = atom<CreateContractExecutionData>({
  key: KEY.CREATE_CONTRACT_EXECUTION_DATA,
  default: null,
});

export function useCreateContractExecutionData() {
  return useRecoilState(createContractExecutionData);
}

export function resetCreateContractExecutionData() {
  return useResetRecoilState(createContractExecutionData);
}

// Create Execution Contract Step
export type CreateContractExecutionStep = number;

const createContractExecutionStep = atom<CreateContractExecutionStep>({
  key: KEY.CREATE_CONTRACT_EXECUTION_STEP,
  default: 0,
});

export function useCreateContractExecutionStep() {
  return useRecoilState(createContractExecutionStep);
}

export function resetCreateContractExecutionStep() {
  return useResetRecoilState(createContractExecutionStep);
}
