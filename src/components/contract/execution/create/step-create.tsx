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
import useCreateContractExecution from '../../../../hooks/api-query/use-create-contract-execution';

type Props = {
  step: number;
};

const StepCreate = ({ step }: Props) => {
  const router = useRouter();

  const [createData] = useCreateContractExecutionData();

  const { mutate } = useCreateContractExecution();

  const goToContractExecution = useCallback(() => {
    router.push(routes.contract_execution);
  }, [router]);

  const onClickCreateButton = useCallback(() => {
    mutate({
      chainId: createData.network.chainId,
      name: createData.name,
      abi: createData.abi,
      address: createData.address,
    });
    goToContractExecution();
  }, [createData, goToContractExecution, mutate]);

  return (
    <Button
      size="large"
      shape="rounded"
      fullWidth={true}
      onClick={onClickCreateButton}
      color="info"
    >
      Create
    </Button>
  );
};

export default StepCreate;
