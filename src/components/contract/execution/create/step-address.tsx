import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { INetwork } from '../../../../apis/network/types';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import useGetNetworks from '../../../../hooks/api-query/use-get-networks';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Listbox from '@/components/ui/list-box';
import axios from 'axios';
import { Switch } from '@headlessui/react';
import cn from 'classnames';
import { useCreateContractExecutionStep } from '../../../../atoms/contract/execution';
import { useCallback } from 'react';
import {
  isContractAddress,
  isValidAddress,
} from '../../../../libs/utils/address';
import { useTranslation } from 'react-i18next';
import { useProvider } from 'wagmi';

type Props = {
  step: number;
};

const StepAddress = ({ step }: Props) => {
  const { t } = useTranslation();
  const [createData, setCreateData] = useCreateContractExecutionData();
  const provider = useProvider({ chainId: createData.network.chainId });

  const [, setCreateStep] = useCreateContractExecutionStep();
  const [error, setError] = useState<boolean>(false);

  const onChangeAddressWithStep = useCallback(
    async (e: BaseSyntheticEvent) => {
      const address = e.target.value;

      setCreateData({ ...createData, address });

      if (
        isValidAddress(address) &&
        (await isContractAddress(provider, address))
      ) {
        setCreateStep(step + 1);
        setError(false);
      } else {
        setCreateStep(step);
        setError(address == '' ? false : true);
      }
    },
    [createData, provider, setCreateData, setCreateStep, step]
  );

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">Address</h3>
      </div>
      <>
        <Input
          useUppercaseLabel={false}
          placeholder="Enter contact address, 0x1f9840a85..."
          onChange={onChangeAddressWithStep}
        />
        {error && (
          <div className="mt-2 ml-3">
            <span className="text-rose-700">
              {t('error.invalid_contract_address')}
            </span>
          </div>
        )}
      </>
    </div>
  );
};

export default StepAddress;
