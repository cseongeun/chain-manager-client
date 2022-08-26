import { ethers } from 'ethers';
import { isValidAddress } from './address';

export enum CONTRACT_TYPE {
  TUPLE = 'tuple',
  ADDRESS = 'address',
  ADDRESSES = 'address[]',
  UINT = 'uint',
}

export const isABI = (value: any) => {
  try {
    new ethers.utils.Interface(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const solidityTypeCheck = (type: string, value: any) => {
  try {
    new ethers.utils.AbiCoder().encode([type], [value]);
    return true;
  } catch (e) {
    return false;
  }
};

export const isNumeric = (value: any): boolean => {
  return /^-?\d+$/.test(value);
};
