import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { INetwork } from '../../../apis/network/types';
import { shortnizeString } from '../../../lib/utils/string';

type ContractRowProps = {
  network: INetwork;
  name: string;
  address: string;
  abi: string;
};

export default function ContractRow({
  network,
  name,
  address,
  abi,
}: ContractRowProps) {
  const router = useRouter();
  // const { requestSwitchNetwork } = useContext(WalletContext);

  // function goToContractActionPage() {
  //   setTimeout(() => {
  //     requestSwitchNetwork(chainId);

  //     router.push(
  //       routes.contractManagementDetail.replace('[contract_hash]', hash)
  //     );
  //   }, 800);
  // }

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-3"
        onClick={() => {}}
      >
        <span className="px-8 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {name}
        </span>
        <span className="px-8 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
          {capitalize(network.name)}
        </span>

        <span className="px-8 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
          <div className="flex">
            {shortnizeString(address)}
            {/* <ClipboardCopy target={contractAddress} className="ml-2" /> */}
          </div>
        </span>
      </div>
    </div>
  );
}