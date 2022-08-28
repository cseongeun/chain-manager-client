import { useEffect } from 'react';
import {
  CreateTokenData,
  TOKEN_TYPE,
  useCreateTokenData,
} from '../../../atoms/token-manager';

type MetadataProps = {
  onChangeMetadata: (key: string, value: any) => void;
};

type MetadataTypeProps = {
  createData: CreateTokenData;
  onChangeMetadata: (key: string, value: any) => void;
};

const ERC20Metadata = ({ createData, onChangeMetadata }: MetadataTypeProps) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-2">
        name
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc20.name ?? ''}
          onChange={(e) => onChangeMetadata('name', e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-2">
        symbol
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc20.symbol ?? ''}
          onChange={(e) => onChangeMetadata('symbol', e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-2">
        initial mint
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={createData.metadata?.erc20.initialMint ?? 0}
          onChange={(e) =>
            onChangeMetadata('initialMint', parseInt(e.target.value))
          }
          min="0"
        />
      </div>
    </>
  );
};

const ERC721Metadata = ({
  createData,
  onChangeMetadata,
}: MetadataTypeProps) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-2">
        name
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc721.name ?? ''}
          onChange={(e) => onChangeMetadata('name', e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-2">
        symbol
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc721.symbol ?? ''}
          onChange={(e) => onChangeMetadata('symbol', e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-2">
        base URI
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc721.baseURI ?? 'https://'}
          onChange={(e) => onChangeMetadata('baseURI', e.target.value)}
        />
      </div>
    </>
  );
};

const ERC1155Metadata = ({
  createData,
  onChangeMetadata,
}: MetadataTypeProps) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-2">
        name
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc1155.name ?? ''}
          onChange={(e) => onChangeMetadata('name', e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-2">
        uri
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          value={createData.metadata?.erc1155.uri ?? ''}
          onChange={(e) => onChangeMetadata('uri', e.target.value)}
        />
      </div>
    </>
  );
};

const Metadata = ({ onChangeMetadata }: MetadataProps) => {
  const [createData] = useCreateTokenData();

  return (
    <div className="p-5">
      {createData.type == TOKEN_TYPE.ERC20 && (
        <ERC20Metadata
          createData={createData}
          onChangeMetadata={onChangeMetadata}
        />
      )}
      {createData.type == TOKEN_TYPE.ERC721 && (
        <ERC721Metadata
          createData={createData}
          onChangeMetadata={onChangeMetadata}
        />
      )}
      {createData.type == TOKEN_TYPE.ERC1155 && (
        <ERC1155Metadata
          createData={createData}
          onChangeMetadata={onChangeMetadata}
        />
      )}
    </div>
  );
};

export default Metadata;
