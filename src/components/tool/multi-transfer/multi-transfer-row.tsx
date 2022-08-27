import { capitalize, replace } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useSwitchNetwork } from 'wagmi';
import { IMultiTransferHistory } from '../../../apis/multi-transfer/types';
import { INetwork } from '../../../apis/network/types';
import routes from '../../../config/routes';
import { toFixed } from '../../../libs/utils/number';
import { shortnizeString } from '../../../libs/utils/string';
import { Copy } from '../../icons/copy';
// import ContractRowDropDown from './contract-row-dropdown';

type MultiTransferRowProps = {
  id: number;
  network: INetwork;
  hash: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  totalAddress: number;
  totalAmount: string;
  memo: string;
  histories: IMultiTransferHistory[];
  refetch: any;
};

export default function MultiTransferRow({
  id,
  network,
  hash,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  totalAddress,
  totalAmount,
  memo,
  histories,
  refetch,
}: MultiTransferRowProps) {
  const router = useRouter();

  const goToMultiTransferDetailPage = useCallback(() => {
    router.push(routes.multi_transfer_detail.replace('[id]', id.toString()));
  }, [id, router]);

  return (
    <div className="relative mb-3  rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-5 items-center gap-3 py-4 sm:h-20 sm:grid-cols-5 sm:gap-6 sm:py-0 lg:grid-cols-5"
        onClick={goToMultiTransferDetailPage}
      >
        <span className="px-8 py-6 text-center text-sm tracking-wider text-gray-500 dark:text-gray-300 ">
          {capitalize(network.label)}
        </span>
        <span className="px-8 py-6 text-center text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {tokenSymbol}
        </span>

        <span className="px-8 py-6 text-center text-sm tracking-wider text-gray-500 dark:text-gray-300">
          <div className="block">
            {totalAddress} addresses
            <div>
              {toFixed(totalAmount, 2)} {tokenSymbol}
            </div>
          </div>
        </span>
        <span className="px-8 py-6 text-center text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {shortnizeString(hash)}
        </span>
        <span className="px-8 py-6 text-center text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {memo}
        </span>
      </div>
      <div className="absolute right-5 top-7">
        {/* <ContractRowDropDown id={id} refetch={refetch} /> */}
      </div>
    </div>
  );
}
