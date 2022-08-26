import { useMutation } from 'react-query';
import { api_deleteContractExecution } from '@/apis/contract-execution';
import { IGetContractExecutionParamReq } from '@/apis/contract-execution/types';
import { useSession } from 'next-auth/react';

export default function useDeleteContractExecution(callbacks?: {
  onSuccess?: any;
  onError?: any;
}) {
  const { data: session } = useSession();

  return useMutation(
    (params: IGetContractExecutionParamReq) =>
      api_deleteContractExecution(session?.accessToken as string, params),
    {
      onSuccess(data) {
        callbacks && callbacks.onSuccess(data);
      },
    }
  );
}
