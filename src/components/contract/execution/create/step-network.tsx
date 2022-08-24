import { useEffect, useState } from 'react';
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
import { useSession } from 'next-auth/react';

interface INetworkListBoxOptions extends INetwork {
  value: string;
}

const StepNetwork = () => {
  const [createData, setCreateData] = useCreateContractExecutionData();

  const [showTestnet, setShowTestnet] = useState<boolean | null>(false);
  const [networkList, setNetworkList] = useState<INetworkListBoxOptions[]>([]);

  useGetNetworks(
    { testnet: showTestnet ? null : showTestnet },
    {
      async onSuccess(result) {
        setNetworkList(result.data);
      },
    }
  );

  const onChangeNetwork = useCallback(
    (network: INetwork) => {
      setCreateData({ ...createData, network });
    },
    [createData]
  );

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">Network</h3>
        <Switch
          checked={showTestnet}
          onChange={setShowTestnet}
          className="flex items-center gap-2 text-gray-400 sm:gap-3"
        >
          <div
            className={cn(
              showTestnet
                ? 'bg-gray-200 dark:bg-gray-500'
                : 'bg-gray-200 dark:bg-gray-500',
              'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                showTestnet
                  ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                  : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
              )}
            />
          </div>
          <span className="inline-flex text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-sm">
            show testnet
          </span>
        </Switch>
      </div>
      <>
        <Listbox
          className="w-full sm:w-80"
          options={networkList}
          selectedOption={createData?.network ?? networkList?.[0]}
          onChange={async (data: INetworkListBoxOptions) => {
            onChangeNetwork(data);

            // if (data != nothingConfigOption[0]) {
            //   await requestSwitchNetwork((data as any).value);
            //   setStep(2);
            // } else {
            //   setStep(1);
            // }
          }}
        />
        {/* {networkValue != nothingConfigOption[0] &&
        networkValue.value !== chainId ? (
          <p className="leading-[1.8] text-red-500">
            Connect wallet to the network of your select
          </p>
        ) : (
          <></>
        )} */}
      </>
    </div>
  );
};

export default StepNetwork;
