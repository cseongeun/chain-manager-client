import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import votePool from '@/assets/images/vote-pool.svg';
import { useCallback, useContext, useEffect, useTransition } from 'react';
import { WalletContext } from '../../../hooks/use-connect';
import { TerminalLine } from '../../../components/icons/terminal-line';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import useGetContractExecutions from '../../../hooks/api-query/use-get-contract-executions';
import { useState } from 'react';
import { IContractExecution } from '../../../apis/contract-execution/types';
import ContractRow from '../../../components/contract/execution/contract-row';
import { useTranslation } from 'react-i18next';

const ContractExecution: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [list, setList] = useState<IContractExecution[]>([]);
  const { refetch } = useGetContractExecutions(
    {},
    {
      onSuccess(response) {
        if (!response || !response.success) return;

        setList(response.data);
      },
    }
  );

  const goToCreateContractExecution = useCallback(() => {
    router.push(routes.contract_execution_create);
  }, [router]);

  return (
    <>
      <NextSeo title="Contract Management" description="Hexlant" />
      <DashboardLayout>
        <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:pt-14">
          <header className="mb-8 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4 xs:items-center xs:gap-3 xl:gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-dark">
                <TerminalLine />
              </div>
              <div>
                <h2 className="mb-2 text-base font-medium uppercase dark:text-gray-100 xl:text-lg">
                  Executing Contract
                </h2>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  You can register the contract and continuously execute the
                  necessary functions.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Button
                shape="rounded"
                fullWidth={true}
                className="uppercase"
                onClick={goToCreateContractExecution}
              >
                Add Contract
              </Button>
            </div>
          </header>
          <div className="mb-3 hidden grid-cols-3 gap-6 rounded-lg bg-white shadow-card dark:bg-light-dark sm:grid lg:grid-cols-3">
            <span className="px-8 py-6 text-sm font-black tracking-wider text-gray-500 dark:text-gray-300	">
              {t('item.contract_name')}
            </span>
            <span className="px-8 py-6  text-sm font-black tracking-wider text-gray-500	dark:text-gray-300">
              {t('item.network')}
            </span>
            <span className="px-8 py-6 text-sm font-black tracking-wider text-gray-500	dark:text-gray-300">
              {t('item.address')}
            </span>
          </div>
          {list.map((contract: any) => {
            return (
              <ContractRow
                key={contract.id}
                id={contract.id}
                network={contract.network}
                name={contract.name}
                address={contract.address}
                abi={contract.abi}
                refetch={refetch}
              />
            );
          })}
        </section>
      </DashboardLayout>
    </>
  );
};

export default ContractExecution;
