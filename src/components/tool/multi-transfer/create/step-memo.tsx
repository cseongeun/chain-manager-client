import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import Input from '@/components/ui/forms/input';
import { useCreateContractExecutionStep } from '../../../../atoms/contract/execution';
import { useCallback } from 'react';
import { isString } from 'lodash';
import {
  useCreateMultiTransferData,
  useCreateMultiTransferStep,
} from '../../../../atoms/tool/multi-transfer';

type Props = {
  step: number;
};

const StepMemo = ({ step }: Props) => {
  const [createData, setCreateData] = useCreateMultiTransferData();
  const [, setCreateStep] = useCreateMultiTransferStep();
  const [error, setError] = useState<boolean>(false);

  const onChangeMemoWithStep = useCallback(
    (e: BaseSyntheticEvent) => {
      const memo = e.target.value;

      setCreateData({ ...createData, memo });
      if (memo != '' && isString(memo)) {
        setCreateStep(step + 1);
        setError(false);
      } else {
        setCreateStep(step);
        setError(memo == '' ? false : true);
      }
    },
    [createData, setCreateData, setCreateStep, step]
  );
  

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">Memo</h3>
      </div>
      <>
        <Input
          useUppercaseLabel={false}
          placeholder="Enter memo "
          onChange={onChangeMemoWithStep}
        />
      </>
    </div>
  );
};

export default StepMemo;
