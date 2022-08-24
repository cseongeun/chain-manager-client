import type { NextPageWithLayout } from '@/types';
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Listbox from '@/components/ui/list-box';
import axios from 'axios';
import { Switch } from '@headlessui/react';
import cn from 'classnames';
import {
  resetCreateContractExecutionData,
  resetCreateContractExecutionStep,
  useCreateContractExecutionStep,
} from '../../../../atoms/contract/execution';
import StepNetwork from '../../../../components/contract/execution/create/step-network';
import StepAddress from '../../../../components/contract/execution/create/step-address';
import StepAbi from '../../../../components/contract/execution/create/step-abi';
import StepName from '../../../../components/contract/execution/create/step-name';
import StepCreate from '../../../../components/contract/execution/create/step-create';

const nothingConfigOption = [{ name: 'Select Network', value: 0 }];

function ContractInformationField() {
  const router = useRouter();
  // const { mainnets, testnets, chainId, address, requestSwitchNetwork } =
  //   useContext(WalletContext);
  // const { isContract, isAddress } = useValidate();

  const [networks, setNetworks] = useState<any>([]);
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState(0);
  const [stepErrorMsg, setStepErrorMsg] = useState('');
  const [showTestNet, setShowTestNet] = useState<boolean>(false);

  const [networkValue, setNetworkValue] = useState(nothingConfigOption[0]);
  const [addressValue, setAddressValue] = useState<string | undefined>(
    undefined
  );
  const [abiValue, setAbiValue] = useState<string | undefined>(undefined);
  const [aliasValue, setAliasValue] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   if (showTestNet) {
  //     setNetworks(
  //       nothingConfigOption
  //         .concat(
  //           mainnets.map(
  //             ({ label, chainId }: { label: string; chainId: number }) => {
  //               return {
  //                 name: label,
  //                 value: chainId,
  //               };
  //             }
  //           )
  //         )
  //         .concat(
  //           testnets.map(
  //             ({ label, chainId }: { label: string; chainId: number }) => {
  //               return {
  //                 name: label,
  //                 value: chainId,
  //               };
  //             }
  //           )
  //         )
  //     );
  //   } else {
  //     setNetworks(
  //       nothingConfigOption.concat(
  //         mainnets.map(
  //           ({ label, chainId }: { label: string; chainId: number }) => {
  //             return {
  //               name: label,
  //               value: chainId,
  //             };
  //           }
  //         )
  //       )
  //     );
  //   }
  // }, [mainnets, showTestNet, testnets]);

  function goToContractExecution() {
    setTimeout(() => {
      router.push(routes.contract_execution);
    }, 800);
  }

  /**
   * step flow
   * 1: network
   * 2: address
   * 3: abi
   * 4: confirm
   * 5: alias
   * 6: add
   */

  return (
    <div className="">
      {/* network */}
      <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
        <div className="-mr-2 mb-3 flex items-center justify-between">
          <h3 className="text-base font-medium dark:text-gray-100">Network</h3>
          <Switch
            checked={showTestNet}
            onChange={setShowTestNet}
            className="flex items-center gap-2 text-gray-400 sm:gap-3"
          >
            <div
              className={cn(
                showTestNet
                  ? 'bg-gray-200 dark:bg-gray-500'
                  : 'bg-gray-200 dark:bg-gray-500',
                'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
              )}
            >
              <span
                className={cn(
                  showTestNet
                    ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                    : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                  'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                )}
              />
            </div>
            <span className="inline-flex text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-sm">
              show testnet
            </span>
          </Switch>
        </div>
        <>
          {/* <Listbox
            className="w-full sm:w-80"
            options={networks}
            selectedOption={networkValue}
            onChange={async (data) => {
              setNetworkValue(data);
              if (data != nothingConfigOption[0]) {
                await requestSwitchNetwork((data as any).value);
                setStep(2);
              } else {
                setStep(1);
              }
            }}
          />
          {networkValue != nothingConfigOption[0] &&
          networkValue.value !== chainId ? (
            <p className="leading-[1.8] text-red-500">
              Connect wallet to the network of your select
            </p>
          ) : (
            <></>
          )} */}
        </>
      </div>

      {/* address */}
      {/* {step >= 2 && networkValue.value === chainId ? (
        <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
          <div className="-mr-2 mb-3 flex items-center justify-between">
            <h3 className="text-base font-medium dark:text-gray-100">
              Address
            </h3>
          </div>
          <>
            <Input
              useUppercaseLabel={false}
              placeholder="Enter contact address, 0x1f9840a85..."
              onChange={(e: BaseSyntheticEvent) => {
                const value = e.target.value;
                setAddressValue(value);
                if (value != undefined && value != '') {
                  setStep(3);
                } else {
                  setStep(2);
                }
              }}
            />
          </>
          {stepError === 2 ? (
            <p className="leading-[1.8] text-red-500">{stepErrorMsg}</p>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )} */}

      {/* abi */}
      {/* {step >= 3 && networkValue.value === chainId ? (
        <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
          <div className="-mr-2 mb-3 flex items-center justify-between">
            <h3 className="text-base font-medium dark:text-gray-100">Abi</h3>
          </div>
          <>
            <Textarea
              placeholder="Enter contract abi,  [{ constant: true, inputs: [].... }, ... ]"
              inputClassName="md:h-32 xl:h-36"
              onChange={(e: BaseSyntheticEvent) => {
                const value = e.target.value;
                setAbiValue(e.target.value);
                if (value != undefined && value != '') {
                  setStep(4);
                } else {
                  setStep(3);
                }
              }}
            />
          </>
          {stepError === 3 ? (
            <p className="leading-[1.8] text-red-500">{stepErrorMsg}</p>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )} */}
      {/* Confirm Button */}
      {/* {step == 4 ? (
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          onClick={async () => {
            const address = await isAddress(addressValue as string);

            if (!address) {
              setStepError(2);
              setStepErrorMsg('Invalid address, please check one more');
              return;
            }

            const contract = await isContract(addressValue as string);
            if (!contract) {
              setStepError(2);
              setStepErrorMsg(
                'Invalid contract address, please check one more'
              );
              return;
            }

            try {
              JSON.parse(abiValue as string);
            } catch (e) {
              setStepError(3);
              setStepErrorMsg('Invalid abi, please check one more');
              return;
            }

            setStepError(0);
            setStepErrorMsg('');
            setStep(5);
          }}
        >
          Confirm
        </Button>
      ) : (
        <></>
      )} */}
      {/* Alias */}
      {/* {step >= 5 ? (
        <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
          <div className="-mr-2 mb-3 flex items-center justify-between">
            <h3 className="text-base font-medium dark:text-gray-100">
              Alias (컨트랙트 별칭)
            </h3>
          </div>
          <>
            <Input
              useUppercaseLabel={false}
              placeholder="Enter contract alias, ABT Token "
              onChange={(e: BaseSyntheticEvent) => {
                const value = e.target.value;
                setAliasValue(value);
                if (value != undefined && value != '') {
                  setStep(6);
                } else {
                  setStep(5);
                }
              }}
            />
          </>
        </div>
      ) : (
        <></>
      )} */}
      {/* Add Button */}
      {/* {step >= 6 ? (
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          onClick={() => {
            axios
              .post('/api/contract/add', {
                network: networkValue.name,
                address,
                chainId: networkValue.value,
                contractAddress: addressValue,
                abi: abiValue,
                alias: aliasValue,
              })
              .then((response) => {
                goToContractManagementPage();
              });
          }}
        >
          Add
        </Button>
      ) : (
        <></>
      )} */}
    </div>
  );
}

const CreateContractExecution: NextPageWithLayout = () => {
  const [step] = useCreateContractExecutionStep();

  const resetData = resetCreateContractExecutionData();
  const resetStep = resetCreateContractExecutionStep();

  useEffect(() => {
    resetData();
    resetStep();
  }, []);

  return (
    <>
      <NextSeo title="Add Contract" description="Hexlant" />
      <DashboardLayout>
        <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:py-16">
          <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
            New contract
          </h2>
          <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
            <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
              Contract Information
            </h3>
            <p className="mb-5 leading-[1.8] dark:text-gray-300"></p>
            <StepNetwork />
            <StepAddress />
            <StepAbi />
            <StepName />
            <StepCreate />
          </div>
        </section>
      </DashboardLayout>
    </>
  );
};

export default CreateContractExecution;
