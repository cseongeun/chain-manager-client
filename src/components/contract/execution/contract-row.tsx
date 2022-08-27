import { capitalize, replace } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useSwitchNetwork } from 'wagmi';
import { INetwork } from '../../../apis/network/types';
import routes from '../../../config/routes';
import { shortnizeString } from '../../../libs/utils/string';
import { Copy } from '../../icons/copy';
import ContractRowDropDown from './contract-row-dropdown';

type ContractRowProps = {
  id: number;
  network: INetwork;
  name: string;
  address: string;
  abi: string;
  refetch: any;
};

export default function ContractRow({
  id,
  network,
  name,
  address,
  abi,
  refetch,
}: ContractRowProps) {
  const router = useRouter();

  const goToContractDetailPage = useCallback(() => {
    router.push(
      routes.contract_execution_detail.replace('[id]', id.toString())
    );
  }, [id, router]);

  return (
    <div className="relative mb-3  rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-3"
        onClick={goToContractDetailPage}
      >
        <span className="r px-8 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {name}
        </span>
        <span className="px-8 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {capitalize(network.label)}
        </span>

        <span className="px-8 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
          <div className="flex">{shortnizeString(address)}</div>
        </span>
      </div>
      <div className="absolute right-5 top-7">
        <ContractRowDropDown id={id} refetch={refetch} />
      </div>
    </div>
  );
}
