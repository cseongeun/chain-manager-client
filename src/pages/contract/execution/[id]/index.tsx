import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import { useEffect, useState } from 'react';
// import { useContractStorage } from '../../../lib/hooks/use-contract-storage';
// import { abiParser } from '../../../lib/utils/parser';
// import FunctionReadList from '../../../components/contracts/function-read-list';
// import FunctionWriteList from '../../../components/contracts/function-write-list';
// import ContractDetailInfo from '../../../components/contracts/contract-detail-info';
import { useCopyToClipboard } from 'react-use';
import { isValidAddress } from '../../../../lib/utils/address';
import routes from '../../../../config/routes';
import useGetContractExecutions from '../../../../hooks/api-query/use-get-contract-executions';
import useGetContractExecution from '../../../../hooks/api-query/use-get-contract-execution';
import { abiParser } from '../../../../lib/utils/parser';
import Info from '../../../../components/contract/execution/detail/info';
import { IContractExecution } from '../../../../apis/contract-execution/types';
import { FunctionReadList } from '../../../../components/contract/execution/detail/function-read-list';
// import { Check } from '../../../components/icons/check';
// import { Copy } from '../../../components/icons/copy';
// import ClipboardCopy from '../../../components/ui/cliboard-copy';

const ContractExecutionDetail: NextPageWithLayout = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const [read, setRead] = useState<any>([]);
  const [write, setWrite] = useState<any>([]);

  const [contract, setContract] = useState<IContractExecution>(undefined);
  const { data: response } = useGetContractExecution({ id: parseInt(id) });

  useEffect(() => {
    if (response) {
      if (!response.success) return;

      const { abi } = response.data;

      const output = abiParser(abi);

      setContract(response.data);
      setRead(output.read);
      setWrite(output.write);
    }
  }, []);

  return (
    <>
      <NextSeo title="Contract Management" description="Hexlant" />
      <DashboardLayout>
        <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:pt-14">
          <header className="mb-8 flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
            <Info label="Name" value={contract?.name} className="mb-5" />
            <Info
              label="network"
              value={contract?.network.name}
              className="mb-5"
            />
            <div>
              <Info
                label="address"
                value={contract?.address}
                // withClipboard={true}
              />
            </div>
          </header>
          <ParamTab
            tabMenu={[
              {
                title: <>Read </>,
                path: 'read',
                dynamicQuery: { id },
              },
              {
                title: <>Write </>,
                path: 'write',
                dynamicQuery: { id },
              },
            ]}
          >
            <TabPanel className="focus:outline-none">
              <FunctionReadList contract={contract} readFunctions={read} />
            </TabPanel>
            <TabPanel className="focus:outline-none">
              {/* <FunctionWriteList
                contract={detailContract}
                writeFunctions={write}
              /> */}
            </TabPanel>
          </ParamTab>
        </section>
      </DashboardLayout>
    </>
  );
};

export default ContractExecutionDetail;
