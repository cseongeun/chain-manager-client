/* eslint-disable react-hooks/rules-of-hooks */
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export enum TOKEN_TYPE {
  ERC20 = 'erc20',
  ERC721 = 'erc721',
  ERC1155 = 'erc1155',
}
export enum ACCESS_CONTRACT_TYPE {
  OWNABLE = 'ownable',
  ROLES = 'roles',
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
    autoIncrementId: boolean;
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

export interface IAccessControl {
  erc20: ACCESS_CONTRACT_TYPE;
  erc721: ACCESS_CONTRACT_TYPE;
  erc1155: ACCESS_CONTRACT_TYPE;
}

export interface IInformation {
  securityContact: string;
  license: string;
}

export const initialType = TOKEN_TYPE.ERC20;

export const initialMetaData: IMetadata = {
  erc20: {
    name: 'HexlantERC20',
    symbol: 'HEX',
    initialMint: 0,
  },
  erc721: {
    name: 'HexlantERC721',
    symbol: 'HEX',
    baseURI: null,
  },
  erc1155: {
    name: 'HexlantERC1155',
    uri: 'https://',
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
    autoIncrementId: false,
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

export const initialAccessControl: IAccessControl = {
  erc20: ACCESS_CONTRACT_TYPE.OWNABLE,
  erc721: null,
  erc1155: null,
};

export const initialInformation: IInformation = {
  securityContact: null,
  license: 'MIT',
};

const KEY = {
  CREATE_TOKEN_DATA: 'CREATE_TOKEN_DATA',
};

// Create Execution Contract Data
export type CreateTokenData = {
  type: TOKEN_TYPE;
  metadata?: IMetadata;
  feature?: IFeature;
  accessControl?: IAccessControl;
  information?: IInformation;
};

const createTokenData = atom<CreateTokenData>({
  key: KEY.CREATE_TOKEN_DATA,
  default: {
    type: initialType,
    metadata: initialMetaData,
    feature: initialFeature,
    accessControl: initialAccessControl,
    information: initialInformation,
  },
});

export function useCreateTokenData() {
  return useRecoilState(createTokenData);
}

export function resetCreateTokenData() {
  return useResetRecoilState(createTokenData);
}
