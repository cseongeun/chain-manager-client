import { BaseSyntheticEvent, useState } from 'react';
import { useCreateContractExecutionData } from '../../../../atoms/contract/execution';
import Textarea from '@/components/ui/forms/textarea';
import { useCreateContractExecutionStep } from '../../../../atoms/contract/execution';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isABI } from '../../../../libs/utils/type';
import { DownloadIcon } from '../../../icons/download-icon';
import AddressAmountTable from './address-amount-table';
import CSVUploader from './csv-uploader';
import { isValidAddress } from '../../../../libs/utils/address';
import {
  useCreateMultiTransferData,
  useCreateMultiTransferStep,
} from '../../../../atoms/tool/multi-transfer';
import { cloneDeep } from 'lodash';
import { isNumberString } from '../../../../libs/utils/number';
import { deepCopy } from 'ethers/lib/utils';

type Props = {
  step: number;
};

const StepData = ({ step }: Props) => {
  const { t } = useTranslation();
  const [createData, setCreateData] = useCreateMultiTransferData();
  const [, setCreateStep] = useCreateMultiTransferStep();
  const [error, setError] = useState<[boolean, boolean][]>([]);

  const checkValidateData = useCallback(
    (temp: any, tempError: any, index: number) => {
      const [address, amount] = temp;
      console.log(address, amount);
      try {
        const validAddress = isValidAddress(address);

        if (!validAddress) {
          tempError[index][0] = true;
        } else {
          tempError[index][0] = false;
        }
      } catch (e) {
        tempError[index][0] = true;
      }

      try {
        const validAmount = isNumberString(amount);
        if (!validAmount) {
          tempError[index][1] = true;
        } else {
          tempError[index][1] = false;
        }
      } catch (e) {
        tempError[index][1] = true;
      }
      console.log(tempError);
      setError([...tempError]);
    },
    []
  );

  const onChangeDataWithStep = useCallback(
    (data: any) => {
      const temp = [];
      const tempError = [];
      for (let i in data) {
        temp[i] = [data[i][0], data[i][1]];
        tempError[i] = [false, false];
        checkValidateData(temp, tempError, parseInt(i));
      }

      setCreateData({ ...createData, data });
      // for (let i in data) {
      //   const [address, amount] = data[i];
      //   checkValidateData(address, amount, parseInt(i));
      // }
    },
    [checkValidateData, createData, setCreateData]
  );

  const downloadSampleData = useCallback(() => {
    fetch('/api/download/multi-transfer-sample', {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Sorry, I could not find that file.');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.setAttribute('download', 'multi_send_sample.csv');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }, []);

  const onChangeData = useCallback(
    (index: number, pos: number, value: any) => {
      const data = cloneDeep(createData.data);

      data[index][pos] = value;

      setCreateData({ ...createData, data });

      checkValidateData(data[index], error, index);
    },
    [checkValidateData, createData, error, setCreateData]
  );

  async function onDeleteAddressValueArr(index: number) {
    createData.data.splice(index, 1);
    // addressAmountArrError.splice(index, 1);
    setCreateData({ ...createData });
    // setAddressAmountArrError([...addressAmountArrError]);
  }

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">
          Address & Amount
        </h3>
        <div className="inline-flex">
          <button onClick={downloadSampleData}>
            <DownloadIcon />
          </button>

          <span className="ml-1 mr-4 inline-flex font-thin	tracking-wider text-gray-900 dark:text-white sm:text-xs">
            sample
          </span>
        </div>
      </div>
      <>
        <div className="mb-8">
          <CSVUploader setter={onChangeDataWithStep} />
        </div>
        <AddressAmountTable
          getter={createData.data}
          errGetter={error}
          onChange={onChangeData}
          onDelete={onDeleteAddressValueArr}
        />
      </>
    </div>
  );
};

export default StepData;
