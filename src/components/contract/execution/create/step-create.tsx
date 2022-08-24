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

const StepCreate = () => {
  const [createData, setCreateData] = useCreateContractExecutionData();

  const onChangeAddress = useCallback(
    (address: string) => {
      setCreateData({ ...createData, address });
    },
    [createData]
  );

  return (
    <Button size="large" shape="rounded" fullWidth={true} onClick={() => {}}>
      Create
    </Button>
  );
};

export default StepCreate;
