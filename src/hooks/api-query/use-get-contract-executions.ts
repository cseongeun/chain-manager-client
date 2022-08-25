import { isUndefined } from 'lodash';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getContractExecutions } from '../../apis/contract-execution';
import {
  IGetContractExecutionQueryReq,
  IGetContractExecutionsRes,
} from '../../apis/contract-execution/types';

const queryKey = (
  accessToken: string,
  { chainId, name, address }: IGetContractExecutionQueryReq
) => ['useGetContractExecutions', [accessToken, chainId, name, address]];

export default function useGetContractExecutions(
  { chainId, name, address }: IGetContractExecutionQueryReq,
  callbacks?: {
    onSuccess?: any;
  }
) {
  const { data: session } = useSession({ required: true });
  const accessToken = session?.accessToken as string;

  return useQuery<IGetContractExecutionsRes>(
    queryKey(accessToken, { chainId, name, address }),
    () =>
      api_getContractExecutions(accessToken as string, {
        chainId,
        name,
        address,
      }),
    {
      enabled: !isUndefined(accessToken),
      onSuccess(data) {
        callbacks && callbacks.onSuccess(data);
      },
    }
  );
}
