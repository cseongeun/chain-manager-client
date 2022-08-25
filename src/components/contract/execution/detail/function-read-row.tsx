import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
// import { zip } from '@/libs/utils/array';
// import { checkTypeValue, isUndefined } from '@/libs/utils/type';
import FunctionCallResult from './function-call-result';
import { useAccount, useContract, useContractRead, useProvider } from 'wagmi';
import { isNull } from 'lodash';

type FunctionReadRowProps = {
  contract: any;
  property: any;
};

export const FunctionReadRow = ({
  contract,
  property,
}: FunctionReadRowProps) => {
  const { isConnected } = useAccount();
  const { name, inputs, outputs, type } = property;
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryArgs, setQueryArgs] = useState<any[]>(
    Array.from({ length: inputs.length }, () => null)
  );

  const enableQuery = useMemo(
    () =>
      isConnected &&
      (inputs.length === 0 || queryArgs.every((e) => !isNull(e))),
    [isConnected, inputs.length, queryArgs]
  );

  useEffect(() => {
    console.log(enableQuery);
    console.log(queryArgs);
    console.log(
      property.name,
      inputs.length === 0 || queryArgs.every((e) => !isNull(e))
    );
  }, [enableQuery, inputs.length, property.name, queryArgs]);

  const { refetch } = useContractRead({
    addressOrName: contract.address,
    contractInterface: JSON.parse(contract.abi),
    functionName: property.name,
    args: queryArgs,
  });

  const query = useCallback(async () => {
    const result = await refetch();
    setQueryResult(result.data.toString());
  }, [refetch]);

  const onChangeInputArgs = useCallback(
    (index: number, value: any) => {
      queryArgs[index] = value == '' ? null : value;
      setQueryArgs([...queryArgs]);
    },
    [queryArgs]
  );

  useEffect(() => {
    console.log(queryArgs);
  }, [queryArgs]);

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-4 items-center gap-3 py-4 sm:h-20 sm:grid-cols-4 sm:gap-6 sm:py-0 "
        onClick={() => setIsExpand(!isExpand)}
      >
        <div className="col-span-2 px-4 sm:px-8">{name}</div>
        {(isExpand || inputs.length == 0) && (
          <div className="col-span-2 px-4  text-end  sm:px-8">
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
      </div>
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
                        <div className="absolute top-1/3 left-1/4 -mt-4 rounded-full ">
                          <Input
                            inputClassName="w-100"
                            useUppercaseLabel={false}
                            placeholder={args.type}
                            value={queryArgs[index]}
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
            {outputs.map((output: any, i: number) => (
              <div key={i} className="mt-3 flex flex-col gap-4 xs:gap-[18px]">
                <FunctionCallResult
                  label={`${output.name || '_'}(${output.type})`}
                  value={queryResult.split(',')[i]}
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
