import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getContractExecutions } from '../../apis/contract-execution';
import {
  IGetContractExecutionQueryReq,
  IGetContractExecutionsRes,
} from '../../apis/contract-execution/types';

const createKey = ({
  chainId,
  name,
  address,
}: IGetContractExecutionQueryReq) => [
  'useGetContractExecutions',
  [chainId, name, address],
];

export default function useGetContractExecutions({
  chainId,
  name,
  address,
}: IGetContractExecutionQueryReq) {
  const { data: session } = useSession();
  console.log(session);

  return useQuery<IGetContractExecutionsRes>(
    createKey({ chainId, name, address }),
    () =>
      api_getContractExecutions(session.accessToken as string, {
        chainId,
        name,
        address,
      })
  );
}
