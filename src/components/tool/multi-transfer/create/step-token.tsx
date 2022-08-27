import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import Input from '@/components/ui/forms/input';
import { useCreateContractExecutionStep } from '../../../../atoms/contract/execution';
import { useCallback } from 'react';
import {
  isContractAddress,
  isValidAddress,
  ZERO_ADDRESS,
} from '../../../../libs/utils/address';
import { useTranslation } from 'react-i18next';
import { erc20ABI, useContractRead, useProvider, useToken } from 'wagmi';
import { Switch } from '@headlessui/react';
import cn from 'classnames';
import {
  useCreateMultiTransferData,
  useCreateMultiTransferStep,
} from '../../../../atoms/tool/multi-transfer';
import { Check } from '../../../icons/check';

type Props = {
  step: number;
};

const StepToken = ({ step }: Props) => {
  const { t } = useTranslation();
  const [createData, setCreateData] = useCreateMultiTransferData();
  const [, setCreateStep] = useCreateMultiTransferStep();
  const provider = useProvider({ chainId: createData.network.chainId });

  const [error, setError] = useState<boolean>(false);
  const [isToken, setIsToken] = useState<boolean>(true);

  const { refetch } = useToken({
    address: createData.tokenAddress,
    chainId: createData.network.chainId,
    onSuccess(data) {
      setCreateData({
        ...createData,
        tokenSymbol: data?.symbol,
        tokenDecimals: data?.decimals,
      });
    },
  });

  const onChangeAddressWithStep = useCallback(
    async (e: BaseSyntheticEvent) => {
      const address = e.target.value;

      setCreateData({ ...createData, tokenAddress: address });

      if (
        isValidAddress(address) &&
        (await isContractAddress(provider, address))
      ) {
        await refetch();
        setCreateStep(step + 1);
        setError(false);
      } else {
        setCreateStep(step);
        setError(address == '' ? false : true);
      }
    },
    [createData, provider, refetch, setCreateData, setCreateStep, step]
  );

  const onChangeIsToken = useCallback(() => {
    const prev = isToken;
    console.log('isToken', isToken);
    setIsToken(!prev);

    if (prev) {
      setCreateData({
        ...createData,
        tokenAddress: ZERO_ADDRESS,
        tokenSymbol: createData.network.currency,
        tokenDecimals: 18,
      });
      setCreateStep(step + 1);
    } else {
      setCreateData({
        ...createData,
        tokenAddress: null,
        tokenSymbol: null,
        tokenDecimals: null,
      });
      setCreateStep(step);
    }
    setError(false);
  }, [createData, isToken, setCreateData, setCreateStep, step]);

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex w-full items-center justify-between">
        <h3 className="inline-flex text-base font-medium dark:text-gray-100">
          What transfer?
        </h3>
        <Switch
          checked={isToken}
          onChange={onChangeIsToken}
          className="flex items-center gap-2 text-gray-400 sm:gap-2"
        >
          <div
            className={cn(
              isToken
                ? 'bg-gray-200 dark:bg-gray-500'
                : 'bg-gray-200 dark:bg-gray-500',
              'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                isToken
                  ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                  : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
              )}
            />
          </div>
          <span className="mr-3 inline-flex text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-sm">
            is Token
          </span>
        </Switch>
      </div>
      <>
        {isToken ? (
          <>
            <Input
              useUppercaseLabel={false}
              placeholder="Enter token contact address, 0x1f9840a85..."
              onChange={onChangeAddressWithStep}
            />
            {error && (
              <div className="mt-2 ml-3">
                <span className="text-rose-700">
                  {t('error.invalid_contract_address')}
                </span>
              </div>
            )}
            {createData.tokenSymbol && (
              <div>
                <div className="mt-1.5 flex">
                  <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <Check className="ml-3 mr-3 h-auto w-3.5 text-green-500" />
                    symbol: {createData.tokenSymbol}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default StepToken;
