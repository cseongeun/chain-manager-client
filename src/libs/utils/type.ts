import { ethers } from 'ethers';

export const isABI = (value: any) => {
  try {
    new ethers.utils.Interface(value);
    return true;
  } catch (e) {
    return false;
  }
};
