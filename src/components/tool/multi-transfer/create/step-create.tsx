import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import { useRouter } from 'next/router';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { useCallback } from 'react';
import useCreateContractExecution from '../../../../hooks/api-query/use-create-contract-execution';
import { useTranslation } from 'react-i18next';

type Props = {
  step: number;
};

const StepCreate = ({ step }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [createData] = useCreateContractExecutionData();

  const { mutate } = useCreateContractExecution();

  const goToContractExecution = useCallback(() => {
    router.push(routes.contract_execution);
  }, [router]);

  const onClickCreateButton = useCallback(() => {
    mutate(
      {
        chainId: createData.network.chainId,
        name: createData.name,
        abi: createData.abi,
        address: createData.address,
      },
      {
        onSuccess() {},
      }
    );
    goToContractExecution();
  }, [
    createData.abi,
    createData.address,
    createData.name,
    createData.network.chainId,
    goToContractExecution,
    mutate,
  ]);

  return (
    <Button
      size="large"
      shape="rounded"
      fullWidth={true}
      onClick={onClickCreateButton}
      color="info"
    >
      Create
    </Button>
  );
};

export default StepCreate;
