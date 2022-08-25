import { isUndefined } from 'lodash';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getNetworks } from '../../apis/network';
import {
  IGetNetworkQueryReq,
  IGetNetworkQueryRes,
} from '../../apis/network/types';

const queryKey = (
  accessToken: string,
  { chainId, name, testnet }: IGetNetworkQueryReq
) => ['useGetNetworks', [accessToken, chainId, name, testnet]];

export default function useGetNetworks(
  { chainId, name, testnet }: IGetNetworkQueryReq,
  callbacks?: {
    onSuccess?: any;
  }
) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string;

  return useQuery<IGetNetworkQueryRes>(
    queryKey(accessToken, { chainId, name, testnet }),
    () =>
      api_getNetworks(accessToken, {
        chainId,
        name,
        testnet,
      }),
    {
      enabled: !isUndefined(accessToken),
      onSuccess(data) {
        callbacks && callbacks.onSuccess(data);
      },
    }
  );
}
