import { useMutation } from 'react-query';
import { api_createContractExecution } from '@/apis/contract-execution';
import { ICreateContractExecutionBodyReq } from '@/apis/contract-execution/types';
import { useSession } from 'next-auth/react';

export default function useCreateContractExecution() {
  const { data: session } = useSession();

  return useMutation((params: ICreateContractExecutionBodyReq) =>
    api_createContractExecution(session?.accessToken as string, params)
  );
}
