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
import { isObject } from 'lodash';

type Props = {
  step: number;
};

const StepAbi = ({ step }: Props) => {
  const [createData, setCreateData] = useCreateContractExecutionData();
  const [, setCreateStep] = useCreateContractExecutionStep();
  const [error, setError] = useState<boolean>(false);

  const onChangeAbiWithStep = useCallback(
    (e: BaseSyntheticEvent) => {
      const abi = e.target.value;

      setCreateData({ ...createData, abi });

      if (isObject(abi)) {
        setCreateStep(step + 1);
        setError(false);
      } else {
        setCreateStep(step);
        setError(abi == '' ? false : true);
      }
    },
    [createData, setCreateData, setCreateStep, step]
  );

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">Abi</h3>
      </div>
      <>
        <Textarea
          placeholder="Enter contract abi,  [{ constant: true, inputs: [].... }, ... ]"
          inputClassName="md:h-32 xl:h-36"
          onChange={onChangeAbiWithStep}
        />
        {error && (
          <div className="mt-2 ml-3">
            <span className="text-rose-700">
              ABI는 JSON 형태의 데이터입니다.
            </span>
          </div>
        )}
      </>
    </div>
  );
};

export default StepAbi;
