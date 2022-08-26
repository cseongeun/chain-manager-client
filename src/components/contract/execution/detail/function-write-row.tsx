import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { isNull } from 'lodash';
import { ethers } from 'ethers';
import { IContractExecution } from '../../../../apis/contract-execution/types';
import { useTranslation } from 'react-i18next';
import ToastMessage from '../../../toast/toast';
import { IABISpec } from '../../../../libs/utils/parser';
import ReactLoading from 'react-loading';
import { isNumeric, solidityTypeCheck } from '../../../../libs/utils/type';

type FucntionWriteRowProps = {
  contract: IContractExecution;
  property: IABISpec;
};

const FunctionWriteRow = ({ contract, property }: FucntionWriteRowProps) => {
  const {
    network: { chainId, currency },
  } = contract;
  const { name, inputs, outputs, type, stateMutability } = property;

  const { t } = useTranslation();
  const { isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [writeHashes, setWriteHashes] = useState<
    { hash: string; state: number }[]
  >([]);
  const [writeValue, setWriteValue] = useState<string>(null);
  const [writeValueError, setWriteValueError] = useState<boolean>(false);
  const [writeArgs, setWriteArgs] = useState<any[]>(
    Array.from({ length: inputs.length }, () => null)
  );
  const [writeArgErrors, setWriteArgErrors] = useState<any[]>(
    Array.from({ length: inputs.length }, () => false)
  );

  const enableWrite = useMemo(
    () =>
      isConnected &&
      (inputs.length === 0 || writeArgs.every((e) => !isNull(e))),
    [isConnected, inputs.length, writeArgs]
  );

  const { write: execute } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: contract.address,
    contractInterface: JSON.parse(contract.abi),
    functionName: property.name,
    args: writeArgs,
    overrides: {
      value: ethers.utils.parseEther((writeValue || '0').toString()),
    },
    async onSuccess(tx) {
      const len = writeHashes.length;

      writeHashes[len] = { hash: tx.hash, state: 0 };
      setWriteHashes([...writeHashes]);

      await tx.wait(1);

      writeHashes[len] = { hash: tx.hash, state: 1 };
      setWriteHashes([...writeHashes]);
    },
  });

  const write = useCallback(async () => {
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
      const valid = solidityTypeCheck(type, writeArgs[index]);
      if (!valid) process = false;

      writeArgErrors[index] = !valid;
      setWriteArgErrors([...writeArgErrors]);
    });

    if (isNumeric(writeValue)) {
      setWriteValueError(true);
      process = true;
    } else {
      setWriteValueError(false);
      process = false;
    }

    if (!process) return;

    await execute();
    setIsExpand(true);
  }, [
    chain?.id,
    chainId,
    execute,
    inputs,
    switchNetwork,
    t,
    writeArgErrors,
    writeArgs,
    writeValue,
  ]);

  const onChangeInputArgs = useCallback(
    (index: number, value: any) => {
      writeArgs[index] = value == '' ? null : value;
      setWriteArgs([...writeArgs]);
    },
    [writeArgs]
  );

  const onChangeValue = useCallback((value: string) => {
    console.log(value);
    setWriteValue(value == '' ? '0' : value);
  }, []);

  const onClickHash = useCallback(
    (hash: string) => {
      const targetChain = chains.find(({ id }) => id === chainId);
      if (!targetChain) return;

      const explorerUrl = targetChain.blockExplorers.default.url;
      if (!explorerUrl) return;

      window.open(`${explorerUrl}/tx/${hash}`, '_blank');
    },
    [chainId, chains]
  );

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
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
            onClick={write}
            disabled={!enableWrite}
          >
            Write
          </Button>
        </div>
      )}
      {
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
              {inputs.length > 0 && (
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
                              type="text"
                              inputClassName={cn(
                                writeArgErrors[index]
                                  ? 'dark:border-red-600'
                                  : ''
                              )}
                              useUppercaseLabel={false}
                              placeholder={args.type}
                              value={writeArgs[index] ?? ''}
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
              )}
              {stateMutability === 'payable' && (
                <div className="px-4 py-4  sm:px-8 sm:py-6">
                  <div className="xs:pb mt-3 border-gray-200 pb-5">
                    <div className={cn('relative flex')}>
                      <span className="font-semibold	 text-slate-500	md:leading-loose		">
                        msg.value (currency)
                      </span>
                      <div className="absolute top-1/3 left-1/4 -mt-4 w-2/4 rounded-full ">
                        <Input
                          inputClassName={cn(
                            writeValueError ? 'dark:border-red-600' : ''
                          )}
                          onKeyDown={(evt: any) => {
                            var ASCIICode = evt.which ? evt.which : evt.keyCode;
                            if (
                              ASCIICode > 31 &&
                              (ASCIICode < 48 || ASCIICode > 57)
                            )
                              return false;
                            return true;
                          }}
                          min={0}
                          type="number"
                          useUppercaseLabel={false}
                          placeholder={'msg.value'}
                          value={writeValue ?? ''}
                          onChange={(e: BaseSyntheticEvent) => {
                            const value = e.target.value;
                            onChangeValue(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {writeHashes ? (
                <div className="border-t border-dashed border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-8 sm:py-6">
                  {writeHashes.map(({ hash, state }, i: number) => (
                    <div
                      key={i}
                      className="mt-3	flex cursor-pointer text-indigo-400"
                      onClick={() => onClickHash(hash)}
                    >
                      {state == 0 ? (
                        <ReactLoading
                          type={'spin'}
                          // color={}
                          height={15}
                          width={15}
                          className="mr-5"
                        />
                      ) : (
                        <></>
                      )}
                      {hash}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      }
    </div>
  );
};

export default FunctionWriteRow;
