import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { INetwork } from '../../../../apis/network/types';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import useGetNetworks from '../../../../lib/hooks/api-query/use-get-networks';
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

const StepName = () => {
  const [createData, setCreateData] = useCreateContractExecutionData();

  const onChangeAddress = useCallback(
    (address: string) => {
      setCreateData({ ...createData, address });
    },
    [createData]
  );

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">
          Name (컨트랙트 별칭)
        </h3>
      </div>
      <>
        <Input
          useUppercaseLabel={false}
          placeholder="Enter contract alias, ABT Token "
          onChange={(e: BaseSyntheticEvent) => {
            const value = e.target.value;
            // setAliasValue(value);
            // if (value != undefined && value != '') {
            //   setStep(6);
            // } else {
            //   setStep(5);
            // }
          }}
        />
      </>
    </div>
  );
};

export default StepName;
