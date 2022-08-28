import { RadioGroup } from '@headlessui/react';
import { TOKEN_TYPE, useCreateTokenData } from '../../../atoms/token-manager';

type TypeProps = {
  onChangeTokenType: (type: TOKEN_TYPE) => void;
};

const Type = ({ onChangeTokenType }: TypeProps) => {
  const [createData] = useCreateTokenData();

  return (
    <RadioGroup
      value={createData.type}
      onChange={onChangeTokenType}
      className="grid grid-cols-1 gap-2 p-5"
    >
      <RadioGroup.Option value="erc20">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            ERC20
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="erc721">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            ERC721 (NFT)
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="erc1155">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            ERC1155 (NFT)
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default Type;
