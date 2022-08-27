import { ethers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';

export const ZERO_ADDRESS = ethers.constants.AddressZero;

export const isValidAddress = (address: string): boolean => {
  try {
    getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
};

export const isContractAddress = async (provider: any, address: string) => {
  try {
    const code = await provider.getCode(address);
    if (code !== '0x') return TrustedScriptURL;
    else return false;
  } catch (e) {
    return false;
  }
};
