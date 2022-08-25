import { getAddress } from 'ethers/lib/utils';

export function isValidAddress(address: string): boolean {
  try {
    const result = getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
}
