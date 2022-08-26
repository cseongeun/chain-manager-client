import { BaseSyntheticEvent, useState } from 'react';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import Textarea from '@/components/ui/forms/textarea';
import { useCreateContractExecutionStep } from '../../../../atoms/contract/execution';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isABI } from '../../../../libs/utils/type';

type Props = {
  step: number;
};

const StepAbi = ({ step }: Props) => {
  const { t } = useTranslation();
  const [createData, setCreateData] = useCreateContractExecutionData();
  const [, setCreateStep] = useCreateContractExecutionStep();
  const [error, setError] = useState<boolean>(false);

  const onChangeAbiWithStep = useCallback(
    (e: BaseSyntheticEvent) => {
      const abi = e.target.value;

      setCreateData({ ...createData, abi });
      if (isABI(abi)) {
        setCreateStep(step + 1);
        setError(false);
      } else {
        setCreateStep(step);
        setError(abi == '' ? false : true);
      }
    },
    [createData, setCreateData, setCreateStep, step]
  );

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">Abi</h3>
      </div>
      <>
        <Textarea
          placeholder="Enter contract abi,  [{ constant: true, inputs: [].... }, ... ]"
          inputClassName="md:h-32 xl:h-36"
          onChange={onChangeAbiWithStep}
        />
        {error && (
          <div className="mt-2 ml-3">
            <span className="text-rose-700">{t('error.invalid_abi')}</span>
          </div>
        )}
      </>
    </div>
  );
};

export default StepAbi;
