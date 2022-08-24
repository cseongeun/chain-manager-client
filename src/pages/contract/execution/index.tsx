import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import votePool from '@/assets/images/vote-pool.svg';
import { useCallback, useContext, useEffect } from 'react';
import { WalletContext } from '../../../lib/hooks/use-connect';
import { TerminalLine } from '../../../components/icons/terminal-line';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import useGetContractExecutions from '../../../lib/hooks/api-query/use-get-contract-executions';
import { useState } from 'react';
import { IContractExecution } from '../../../apis/contract-execution/types';
import ContractRow from '../../../components/contract/execution/contract-row';

const ContractManagementPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [list, setList] = useState<IContractExecution[]>([]);
  const { data } = useGetContractExecutions({});

  const goToCreateContractExecution = useCallback(() => {
    router.push(routes.contract_execution_create);
  }, []);

  useEffect(() => {
    if (data) {
      if (!data.success) return;

      setList(data.data);
    }
  }, [data]);

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
                  Managing Contract
                </h2>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  You can register a contract related to your wallet and manage
                  it continuously.
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
              Contract Name
            </span>
            <span className="px-8 py-6 text-sm font-black tracking-wider text-gray-500 dark:text-gray-300	">
              Network
            </span>
            <span className="px-8 py-6 text-sm font-black tracking-wider text-gray-500 dark:text-gray-300	">
              Address
            </span>
          </div>
          {list.map((contract: any) => {
            return (
              <ContractRow
                key={contract.id}
                network={contract.network}
                name={contract.name}
                address={contract.address}
                abi={contract.abi}
              />
            );
          })}
        </section>
      </DashboardLayout>
    </>
  );
};

export default ContractManagementPage;
