import type { NextPageWithLayout } from '@/types';
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
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
import {
  resetCreateContractExecutionData,
  resetCreateContractExecutionStep,
  useCreateContractExecutionStep,
} from '../../../../atoms/contract/execution';
// import StepNetwork from '../../../../components/tool/muli/create/step-network';
// import StepAddress from '../../../../components/contract/execution/create/step-address';
// import StepAbi from '../../../../components/contract/execution/create/step-abi';
// import StepName from '../../../../components/contract/execution/create/step-name';
// import StepCreate from '../../../../components/contract/execution/create/step-create';
import {
  resetCreateMultiTransferData,
  resetCreateMultiTransferStep,
  useCreateMultiTransferStep,
} from '../../../../atoms/tool/multi-transfer';
import StepNetwork from '../../../../components/tool/multi-transfer/create/step-network';
import StepToken from '../../../../components/tool/multi-transfer/create/step-token';
import StepData from '../../../../components/tool/multi-transfer/create/step-data';
import StepMemo from '../../../../components/tool/multi-transfer/create/step-memo';

const CreateMultiTransfer: NextPageWithLayout = () => {
  const [createStep] = useCreateMultiTransferStep();

  const resetData = resetCreateMultiTransferData();
  const resetStep = resetCreateMultiTransferStep();

  useEffect(() => {
    resetData();
    resetStep();
  }, []);

  return (
    <>
      <NextSeo title="Add Contract" description="Hexlant" />
      <DashboardLayout>
        <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:py-16">
          <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
            New multi transfer
          </h2>
          <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
            <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
              Information
            </h3>
            <p className="mb-5 leading-[1.8] dark:text-gray-300"></p>
            {/* Step 0 */}
            {(!createStep || createStep >= 0) && <StepNetwork step={0} />}
            {/* Step 1  */}
            {createStep >= 1 && <StepToken step={1} />}
            {/* Step 2 */}
            {createStep >= 2 && <StepData step={2} />}
            {/* Step 3 */}
            {createStep >= 3 && <StepMemo step={3} />}
            {/* Step 4 */}
            {/* {createStep >= 4 && <StepCreate step={4} />} */}
          </div>
        </section>
      </DashboardLayout>
    </>
  );
};

export default CreateMultiTransfer;
