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

type Props = {
  step: number;
};

const StepData = ({ step }: Props) => {
  const { t } = useTranslation();
  const [createData, setCreateData] = useCreateContractExecutionData();
  const [, setCreateStep] = useCreateContractExecutionStep();
  const [error, setError] = useState<boolean>(false);

  const onChangeDataWithStep = useCallback(
    (data: any) => {
      console.log(data);
      // const temp: any = [];
      // const tempError: any = [];
      // for (let i in data) {
      //   temp[i] = [data[i][0], data[i][1]];
      //   tempError[i] = [false, false];
      //   onCheckAddressValueArr(temp, tempError, parseInt(i));
      // }
      // setAddressAmountArrValue([...temp]);
      // setCreateData({ ...createData, abi });
      // if (isABI(abi)) {
      //   setCreateStep(step + 1);
      //   setError(false);
      // } else {
      //   setCreateStep(step);
      //   setError(abi == '' ? false : true);
      // }
    },
    [createData, setCreateData, setCreateStep, step]
  );

  const downloadSampleSendBook = useCallback(() => {
    // fetch('/api/download/multi-send-sample', {
    //   method: 'GET',
    // })
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       throw new Error('Sorry, I could not find that file.');
    //     }
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = url;
    //     a.setAttribute('download', 'multi_send_sample.csv');
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   });
  }, []);

  // async function onSetAddressValueArr(data: any) {
  //   const temp: any = [];
  //   const tempError: any = [];
  //   for (let i in data) {
  //     temp[i] = [data[i][0], data[i][1]];
  //     tempError[i] = [false, false];
  //     onCheckAddressValueArr(temp, tempError, parseInt(i));
  //   }
  //   setAddressAmountArrValue([...temp]);
  // }

  return (
    <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
      <div className="-mr-2 mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium dark:text-gray-100">
          Address & Amount
        </h3>
        <div className="inline-flex">
          <button
            onClick={() => {
              downloadSampleSendBook();
            }}
          >
            <DownloadIcon />
          </button>

          <span className="ml-1 mr-4 inline-flex font-thin	tracking-wider text-gray-900 dark:text-white sm:text-xs">
            sample
          </span>
        </div>
      </div>
      <>
        <div className="mb-8">
          <CSVUploader
            setter={onChangeDataWithStep}
            // errorSetter={setAddressAmountArrError}
          />
        </div>
        {/* <AddressAmountTable
          getter={addressAmountArrValue}
          errGetter={addressAmountArrError}
          onChange={onChangeAddressValueArr}
          onDelete={onDeleteAddressValueArr}
        /> */}
      </>
    </div>
  );
};

export default StepData;
