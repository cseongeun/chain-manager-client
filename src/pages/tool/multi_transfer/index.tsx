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
import useGetMultiTransfers from '../../../hooks/api-query/use-get-multi-transfers';
import { IMultiTransfer } from '../../../apis/multi-transfer/types';
import MultiTransferRow from '../../../components/tool/multi-transfer/multi-transfer-row';

const MultiTransfer: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [list, setList] = useState<IMultiTransfer[]>([]);
  const { refetch } = useGetMultiTransfers(
    {},
    {
      onSuccess(response) {
        if (!response || !response.success) return;

        setList(response.data);
      },
    }
  );

  const goToCreateMultiTransfer = useCallback(() => {
    router.push(routes.multi_transfer_create);
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
                onClick={goToCreateMultiTransfer}
              >
                Create Multi Transfer
              </Button>
            </div>
          </header>
          <div className="mb-3 hidden grid-cols-5 gap-6 rounded-lg bg-white shadow-card dark:bg-light-dark sm:grid lg:grid-cols-5">
            <span className="px-8 py-6 text-center text-sm font-black tracking-wider text-gray-500 dark:text-gray-300	">
              Network
            </span>
            <span className="px-8 py-6 text-center text-sm font-black tracking-wider text-gray-500	dark:text-gray-300">
              Transfer
            </span>
            <span className="px-8 py-6 text-center text-sm font-black tracking-wider text-gray-500	dark:text-gray-300">
              Address
              <br />
              Amount
            </span>
            <span className="px-8 py-6 text-center text-sm font-black tracking-wider text-gray-500	dark:text-gray-300">
              Hash
            </span>
            <span className="px-8 py-6 text-center text-sm font-black tracking-wider text-gray-500	dark:text-gray-300">
              Memo
            </span>
          </div>
          {list.map((item: IMultiTransfer) => {
            return (
              <MultiTransferRow
                key={item.id}
                id={item.id}
                network={item.network}
                hash={item.hash}
                tokenAddress={item.tokenAddress}
                tokenSymbol={item.tokenSymbol}
                tokenDecimals={item.tokenDecimals}
                totalAddress={item.totalAddress}
                totalAmount={item.totalAmount}
                memo={item.memo}
                histories={item.histories}
                refetch={refetch}
              />
            );
          })}
        </section>
      </DashboardLayout>
    </>
  );
};

export default MultiTransfer;
