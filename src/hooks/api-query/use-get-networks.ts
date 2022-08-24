import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getNetworks } from '../../apis/network';
import {
  IGetNetworkQueryReq,
  IGetNetworkQueryRes,
} from '../../apis/network/types';

const createKey = ({ chainId, name, testnet }: IGetNetworkQueryReq) => [
  'useGetNetworks',
  [chainId, name, testnet],
];

export default function useGetNetworks(
  { chainId, name, testnet }: IGetNetworkQueryReq,
  callbacks?: {
    onSuccess?: any;
  }
) {
  const { data: session } = useSession();

  return useQuery<IGetNetworkQueryRes>(
    createKey({ chainId, name, testnet }),
    () =>
      api_getNetworks(session?.accessToken as string, {
        chainId,
        name,
        testnet,
      }),
    {
      onSuccess(data) {
        callbacks && callbacks.onSuccess(data);
      },
    }
  );
}
