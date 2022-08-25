import { BaseSyntheticEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
// import { zip } from '@/libs/utils/array';
// import { checkTypeValue, isUndefined } from '@/libs/utils/type';
import FunctionCallResult from './function-call-result';

type FunctionReadRowProps = {
  property: any;
  handleTransaction: any;
};

export const FunctionReadRow = ({
  property,
  handleTransaction,
}: FunctionReadRowProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const { name, inputs, outputs, type } = property;

  const [args, setArgs] = useState<any[]>([]);
  const [argsError, setArgsError] = useState<boolean[]>(
    Array.from({ length: inputs.length }, () => false)
  );
  const [result, setResult] = useState<any>(undefined);
  const [error, setError] = useState<any>(undefined);

  const inputArgs = (index: number, value: any) => {
    const checkEmpty = value || '';

    if (checkEmpty == '') {
      delete args[index];
    } else {
      args[index] = value;
    }
    setArgs(args);
  };

  const availableProcess = () => {
    // const argsType = inputs.map(({ type }: { type: string }) => type);
    // const valueTypeZip = zip(argsType, args);
    // let success = true;
    // const tempArgsError = argsError;
    // valueTypeZip.map(([type, value]: [string, any], index: number) => {
    //   if (isUndefined(value)) {
    //     tempArgsError[index] = true;
    //     success = false;
    //     return;
    //   }
    //   const valid = checkTypeValue(type, value);
    //   if (!valid) {
    //     tempArgsError[index] = true;
    //     success = false;
    //   } else {
    //     tempArgsError[index] = false;
    //   }
    // });
    // setArgsError([...tempArgsError]);
    // return success;
  };

  const execute = async () => {
    const result = await handleTransaction({ name, args, inputs });

    if (result.success) {
      setResult(result.result);
      setError(undefined);
    } else {
      setResult(undefined);
      setError(result.error);
    }
  };

  const resultLine = () => {
    return (
      <div>
        {result && isExpand ? (
          outputs.map((output: any, i: number) => (
            <div key={i} className="mt-3 flex flex-col gap-4 xs:gap-[18px]">
              <FunctionCallResult
                label={`${output.name || '_'}(${output.type})`}
                value={result.split(',')[i]}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-5"
        onClick={() => setIsExpand(!isExpand)}
      >
        <div className="flex justify-between">
          <div className="col-span-2 px-4 sm:col-auto sm:px-8">{name}</div>
          {isExpand || inputs.length == 0 ? (
            <Button size="mini" shape="rounded" className="flex-2">
              Query{' '}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
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
            <div className="border-t border-dashed border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-8 sm:py-6">
              <div className="mb-6 flex items-center justify-center rounded-lg bg-gray-100 p-3 text-center text-xs font-medium uppercase tracking-wider text-gray-900 dark:bg-gray-900 dark:text-white sm:h-13 sm:text-sm">
                asdasd
              </div>
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* <TransactionInfo
                    label="Liquidity:"
                    value={liquidity}
                    className="text-xs sm:text-sm"
                  />
                  <TransactionInfo
                    label="Multiplier:"
                    value={multiplier}
                    className="text-xs sm:text-sm"
                  /> */}
                </div>
              </div>
              {/* {children} */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
