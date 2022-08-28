import { useEffect } from 'react';
import {
  CreateTokenData,
  TOKEN_TYPE,
  useCreateTokenData,
} from '../../../atoms/token-manager';

type InformationProps = {
  onChangeInformation: (key: string, value: string) => void;
};

const Information = ({ onChangeInformation }: InformationProps) => {
  const [createData] = useCreateTokenData();

  return (
    <div className="p-5">
      <div className="mb-4 grid grid-cols-1 gap-2">
        security Contract
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          placeholder={'contract@hexlant.com'}
          value={createData.information?.securityContact ?? ''}
          onChange={(e) =>
            onChangeInformation('securityContact', e.target.value)
          }
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-2">
        license
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="text"
          placeholder={'MIT'}
          value={createData.information?.license ?? ''}
          onChange={(e) => onChangeInformation('license', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Information;
