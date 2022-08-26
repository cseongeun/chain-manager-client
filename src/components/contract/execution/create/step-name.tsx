import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import Input from '@/components/ui/forms/input';
import { useCreateContractExecutionStep } from '../../../../atoms/contract/execution';
import { useCallback } from 'react';
import { isString } from 'lodash';

type Props = {
  step: number;
};

const StepName = ({ step }: Props) => {
  const [createData, setCreateData] = useCreateContractExecutionData();
  const [, setCreateStep] = useCreateContractExecutionStep();
  const [error, setError] = useState<boolean>(false);

  const onChangeNameWithStep = useCallback(
    (e: BaseSyntheticEvent) => {
      const name = e.target.value;

      setCreateData({ ...createData, name });
      if (name != '' && isString(name)) {
        setCreateStep(step + 1);
        setError(false);
      } else {
        setCreateStep(step);
        setError(name == '' ? false : true);
      }
    },
    [createData, setCreateData, setCreateStep, step]
  );

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">
          Name (contract Alias)
        </h3>
      </div>
      <>
        <Input
          useUppercaseLabel={false}
          placeholder="Enter contract name(Alais), ABT Token "
          onChange={onChangeNameWithStep}
        />
      </>
    </div>
  );
};

export default StepName;
