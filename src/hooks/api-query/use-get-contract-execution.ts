import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { api_getContractExecution } from '../../apis/contract-execution';
import {
  IGetContractExecutionParamReq,
  IGetContractExecutionRes,
} from '../../apis/contract-execution/types';

const createKey = ({ id }: IGetContractExecutionParamReq) => [
  'useGetContractExecution',
  [id],
];

export default function useGetContractExecution({
  id,
}: IGetContractExecutionParamReq) {
  const { data: session } = useSession();

  return useQuery<IGetContractExecutionRes>(createKey({ id }), () =>
    api_getContractExecution(session.accessToken as string, { id })
  );
}
