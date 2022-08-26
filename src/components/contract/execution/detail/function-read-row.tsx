import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import FunctionCallResult from './function-call-result';
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { isNull } from 'lodash';
import { IContractExecution } from '@/apis/contract-execution/types';
import ToastMessage from '../../../toast/toast';
import { useTranslation } from 'react-i18next';
import { solidityTypeCheck } from '../../../../libs/utils/type';

type FunctionReadRowProps = {
  contract: IContractExecution;
  property: any;
};

const FunctionReadRow = ({ contract, property }: FunctionReadRowProps) => {
  const { chainId } = contract.network;
  const { name, inputs, outputs, type } = property;

  const { t } = useTranslation();
  const { isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryArgs, setQueryArgs] = useState<any[]>(
    Array.from({ length: inputs.length }, () => null)
  );
  const [queryArgErrors, setQueryArgErrors] = useState<any[]>(
    Array.from({ length: inputs.length }, () => false)
  );

  const enableQuery = useMemo(
    () =>
      isConnected &&
      (inputs.length === 0 || queryArgs.every((e) => !isNull(e))),
    [isConnected, inputs.length, queryArgs]
  );

  const { refetch } = useContractRead({
    addressOrName: contract.address,
    contractInterface: JSON.parse(contract.abi),
    functionName: property.name,
    args: queryArgs,
  });

  const query = useCallback(async () => {
    if (chain?.id !== chainId) {
      ToastMessage({
        type: 'warn',
        message: t('toast.switch_network'),
      });

      switchNetwork(chainId);
      return;
    }

    let process = true;
    inputs.map(({ type }, index: number) => {
      const valid = solidityTypeCheck(type, queryArgs[index]);
      if (!valid) process = false;

      queryArgErrors[index] = !valid;
      setQueryArgErrors([...queryArgErrors]);
    });
    if (!process) return;

    const result = await refetch();

    setQueryResult(result.data);
    setIsExpand(true);
  }, [
    chain?.id,
    chainId,
    inputs,
    queryArgErrors,
    queryArgs,
    refetch,
    switchNetwork,
    t,
  ]);

  const onChangeInputArgs = useCallback(
    (index: number, value: any) => {
      queryArgs[index] = value == '' ? null : value;
      setQueryArgs([...queryArgs]);
    },
    [queryArgs]
  );

  const onClickAddress = useCallback(
    (hash: string) => {
      const targetChain = chains.find(({ id }) => id === chainId);
      if (!targetChain) return;

      const explorerUrl = targetChain.blockExplorers.default.url;
      if (!explorerUrl) return;

      window.open(`${explorerUrl}/address/${hash}`, '_blank');
    },
    [chainId, chains]
  );

  return (
    <div className="relative mb-3  rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-4 items-center gap-3 py-4 sm:h-20 sm:grid-cols-4 sm:gap-6 sm:py-0 "
        onClick={() => setIsExpand(!isExpand)}
      >
        <div className="col-span-2 px-4 sm:px-8">{name}</div>
      </div>
      {(isExpand || inputs.length == 0) && (
        <div className="absolute  right-2  top-3 px-4 text-end sm:top-6 sm:px-8">
          <Button
            size="mini"
            shape="rounded"
            onClick={query}
            disabled={!enableQuery}
          >
            Query
          </Button>
        </div>
      )}
      {inputs.length > 0 && (
        <AnimatePresence initial={false}>
          {isExpand && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="px-4 py-4  sm:px-8 sm:py-6">
                {inputs.map((args: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="xs:pb mt-3 border-gray-200 pb-5"
                    >
                      <div className={cn('relative flex')}>
                        <span className="text-slate-500	 md:leading-loose	">
                          {args.name || '_input'}
                        </span>
                        <div className="absolute top-1/3 left-1/4 -mt-4 w-2/4 rounded-full ">
                          <Input
                            inputClassName={cn(
                              queryArgErrors[index] ? 'dark:border-red-600' : ''
                            )}
                            useUppercaseLabel={false}
                            placeholder={args.type}
                            value={queryArgs[index] ?? ''}
                            onChange={(e: BaseSyntheticEvent) => {
                              const value = e.target.value;
                              onChangeInputArgs(index, value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <div>
        {queryResult && isExpand ? (
          <div className="border-t border-dashed border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-8 sm:py-6">
            <FunctionCallResult
              outputs={outputs}
              result={queryResult}
              onClickAddress={onClickAddress}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FunctionReadRow;
