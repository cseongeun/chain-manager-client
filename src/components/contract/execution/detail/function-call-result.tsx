import { useCallback } from 'react';
import { useNetwork } from 'wagmi';
import { IABIArgu } from '../../../../libs/utils/parser';
import { CONTRACT_TYPE } from '../../../../libs/utils/type';
import cn from 'classnames';

type FunctionCallResultProps = {
  outputs: IABIArgu[];
  result: any;
  onClickAddress: (address: string) => void;
};

const FunctionCallResult = ({
  outputs,
  result,
  onClickAddress,
}: FunctionCallResultProps) => {
  const isMultipleReturns = outputs.length > 1;

  const { chain, chains } = useNetwork();

  return (
    <div className={'items-center dark:text-gray-300'}>
      {outputs.map(({ name, type, components }, index: number) => {
        return (
          <div key={index} className="mt-3">
            <span className="font-medium text-gray-600" key={index}>
              {name || '_'} ({type})
            </span>
            {type == CONTRACT_TYPE.TUPLE ? (
              components.map(
                ({ name: comName, type: comType }, comIndex: number) => {
                  return (
                    <div key={`${index}-${comIndex}`}>
                      <div>
                        <span className="ml-10 mt-3 font-medium text-gray-400">
                          {comName || '_'} ({comType})
                        </span>
                        {isMultipleReturns ? (
                          <span
                            className={cn(
                              'ml-10 mr-5 text-blue-700',
                              comType === CONTRACT_TYPE.ADDRESS
                                ? 'cursor-pointer'
                                : ''
                            )}
                            onClick={() => {
                              if (comType == CONTRACT_TYPE.ADDRESS) {
                                onClickAddress(
                                  result[index][comIndex].toString()
                                );
                              }
                            }}
                          >
                            {result[index][comIndex].toString()}
                          </span>
                        ) : (
                          <span
                            className={cn(
                              'ml-10 mr-5 text-blue-700',
                              comType === CONTRACT_TYPE.ADDRESS
                                ? 'cursor-pointer'
                                : ''
                            )}
                            onClick={() => {
                              if (comType == CONTRACT_TYPE.ADDRESS) {
                                onClickAddress(result[comIndex].toString());
                              }
                            }}
                          >
                            {result[comIndex].toString()}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }
              )
            ) : isMultipleReturns ? (
              <span
                className={cn(
                  'ml-10 mr-5 text-blue-700',
                  type === CONTRACT_TYPE.ADDRESS ? 'cursor-pointer' : ''
                )}
                onClick={() => {
                  if (type == CONTRACT_TYPE.ADDRESS) {
                    onClickAddress(result[index].toString());
                  }
                }}
              >
                {result[index].toString()}
              </span>
            ) : (
              <span
                className={cn(
                  'ml-10 mr-5 text-blue-700',
                  type === CONTRACT_TYPE.ADDRESS ? 'cursor-pointer' : ''
                )}
                onClick={() => {
                  if (type == CONTRACT_TYPE.ADDRESS) {
                    onClickAddress(result.toString());
                  }
                }}
              >
                {result.toString()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FunctionCallResult;
