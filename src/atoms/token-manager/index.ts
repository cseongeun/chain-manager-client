/* eslint-disable react-hooks/rules-of-hooks */
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export enum TOKEN_TYPE {
  ERC20 = 'erc20',
  ERC721 = 'erc721',
  ERC1155 = 'erc1155',
}

export interface IMetadata {
  erc20: {
    name: string;
    symbol: string;
    initialMint?: number;
  };
  erc721: {
    name: string;
    symbol: string;
    baseURI?: string;
  };
  erc1155: {
    name: string;
    uri?: string;
  };
}

export interface IFeature {
  erc20: {
    mintable: boolean;
    burnable: boolean;
    pausable: boolean;
    permit: boolean;
    votes: boolean;
    snapshot: boolean;
  };
  erc721: {
    mintable: boolean;
    autoIncrementMint: boolean;
    burnable: boolean;
    pausable: boolean;
    votes: boolean;
    enumerable: boolean;
    uriStorage: boolean;
  };
  erc1155: {
    mintable: boolean;
    burnable: boolean;
    pausable: boolean;
    supplyTracking: boolean;
    updatableURI: boolean;
  };
}
export const initialMetaData: IMetadata = {
  erc20: {
    name: null,
    symbol: null,
    initialMint: null,
  },
  erc721: {
    name: null,
    symbol: null,
    baseURI: null,
  },
  erc1155: {
    name: null,
    uri: null,
  },
};

export const initialFeature: IFeature = {
  erc20: {
    mintable: false,
    burnable: false,
    pausable: false,
    permit: false,
    votes: false,
    snapshot: false,
  },
  erc721: {
    mintable: false,
    autoIncrementMint: false,
    burnable: false,
    pausable: false,
    votes: false,
    enumerable: false,
    uriStorage: false,
  },
  erc1155: {
    mintable: false,
    burnable: false,
    pausable: false,
    supplyTracking: false,
    updatableURI: false,
  },
};

const KEY = {
  CREATE_TOKEN_DATA: 'CREATE_TOKEN_DATA',
};

// Create Execution Contract Data
export type CreateTokenData = {
  type: TOKEN_TYPE;
  metadata?: IMetadata;
  feature?: IFeature;
};

const createTokenData = atom<CreateTokenData>({
  key: KEY.CREATE_TOKEN_DATA,
  default: {
    type: TOKEN_TYPE.ERC20,
    metadata: initialMetaData,
    feature: initialFeature,
  },
});

export function useCreateTokenData() {
  return useRecoilState(createTokenData);
}

export function resetCreateTokenData() {
  return useResetRecoilState(createTokenData);
}
