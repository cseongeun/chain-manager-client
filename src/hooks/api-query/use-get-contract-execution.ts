import { isUndefined } from 'lodash';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getContractExecution } from '@/apis/contract-execution';
import {
  IGetContractExecutionParamReq,
  IGetContractExecutionRes,
} from '@/apis/contract-execution/types';

const queryKey = (
  accessToken: string,
  { id }: IGetContractExecutionParamReq
) => ['useGetContractExecution', [accessToken, id]];

export default function useGetContractExecution(
  { id }: IGetContractExecutionParamReq,
  callbacks?: {
    onSuccess?: any;
    onError?: any;
  }
) {
  const { data: session } = useSession({ required: true });
  const accessToken = session?.accessToken as string;

  return useQuery<IGetContractExecutionRes>(
    queryKey(accessToken, { id }),
    () => api_getContractExecution(accessToken, { id }),
    {
      enabled: !isUndefined(accessToken),
      onSuccess(data) {
        callbacks && callbacks.onSuccess(data);
      },
      onError(err) {
        callbacks && callbacks.onError(err);
      },
    }
  );
}
