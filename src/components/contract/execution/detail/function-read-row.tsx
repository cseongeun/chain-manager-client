import { BaseSyntheticEvent, useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
// import Input from '../ui/forms/input';
// import { zip } from '../../lib/utils/array';
// import { checkTypeValue, isUndefined } from '../../lib/utils/type';
// import FunctionCallResult from './function-call-result';

type FunctionReadRowProps = {
  property: any;
  handleTransaction: any;
};

export const FunctionReadRow = ({ property, handleTransaction }: any) => {
  const [isClicked, setIsClicked] = useState(false);

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
        {result && isClicked ? (
          outputs.map((output: any, i: number) => (
            <div key={i} className="mt-3 flex flex-col gap-4 xs:gap-[18px]">
              {/* <FunctionCallResult
                label={`${output.name || '_'}(${output.type})`}
                value={result.split(',')[i]}
              /> */}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-lg bg-white p-5 transition-shadow duration-200 dark:bg-light-dark xs:p-6',
        isClicked ? 'shadow-large' : 'shadow-card hover:shadow-large'
      )}
    >
      <motion.div layout className="flex  flex-col-reverse justify-between">
        <div className="flex justify-between">
          <h3
            onClick={() => setIsClicked(!isClicked)}
            className="flex-1 cursor-pointer text-base font-medium dark:text-gray-100 2xl:text-lg"
          >
            {name}
          </h3>
          {isClicked || inputs.length == 0 ? (
            <Button
              size="mini"
              shape="rounded"
              className="flex-2"
              onClick={async () => {
                setIsClicked(true);
                const condition = availableProcess();
                // if (condition) {
                //   await execute();
                // }
              }}
            >
              Query
            </Button>
          ) : (
            <></>
          )}
        </div>
      </motion.div>
      {inputs.length > 0 ? (
        isClicked ? (
          <div className="mt-10">
            {inputs.map((args: any, index: number) => {
              return (
                <div key={index} className="xs:pb mt-9 border-gray-200 pb-5">
                  <div className={cn('relative flex')}>
                    <span className="md:leading-loose">
                      {args.name || '_input'}
                    </span>
                    <div className="absolute top-1/3 left-1/4 -mt-4 rounded-full ">
                      {/* <Input
                        useUppercaseLabel={false}
                        placeholder={args.type}
                        onChange={(e: BaseSyntheticEvent) => {
                          const value = e.target.value;
                          inputArgs(index, value);
                        }}
                      />
                      {argsError[index] ? (
                        <p className="text-red-500">Invalid value</p>
                      ) : (
                        <></>
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })}
            {resultLine()}
          </div>
        ) : (
          <></>
        )
      ) : (
        resultLine()
      )}
    </motion.div>
  );
};

export default FunctionReadRow;
