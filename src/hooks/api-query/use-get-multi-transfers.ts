import { isUndefined } from 'lodash';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getMultiTransfers } from '../../apis/multi-transfer';
import {
  IGetMultiTransferQueryReq,
  IGetMultiTransferRes,
} from '../../apis/multi-transfer/types';

const queryKey = (
  accessToken: string,
  { chainId, tokenAddress, hash }: IGetMultiTransferQueryReq
) => ['useGetMultiTransfers', [accessToken, chainId, tokenAddress, hash]];

export default function useGetMultiTransfers(
  { chainId, tokenAddress, hash }: IGetMultiTransferQueryReq,
  callbacks?: {
    onSuccess?: any;
  }
) {
  const { data: session } = useSession({ required: true });
  const accessToken = session?.accessToken as string;

  return useQuery<IGetMultiTransferRes>(
    queryKey(accessToken, { chainId, tokenAddress, hash }),
    () =>
      api_getMultiTransfers(accessToken as string, {
        chainId,
        tokenAddress,
        hash,
      }),
    {
      enabled: !isUndefined(accessToken),
      onSuccess(data) {
        callbacks && callbacks.onSuccess(data);
      },
    }
  );
}
