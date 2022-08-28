/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import Setting from '@/components/token-manager/setting';
import {
  initialAccessControl,
  initialFeature,
  initialInformation,
  initialMetaData,
  resetCreateTokenData,
  TOKEN_TYPE,
  useCreateTokenData,
} from '../../atoms/token-manager';
import { useCallback, useEffect, useMemo } from 'react';
import hljs from '@/libs/contract-generator/sources/highlight';
import {
  buildGeneric,
  Contract,
  ContractBuilder,
  printContract,
} from '../../libs/contract-generator/sources';
import { injectHyperlinks } from '../../libs/contract-generator/sources/inject-hyperlinks';
import Button from '../../components/ui/button';

const TokenManager: NextPageWithLayout = () => {
  const router = useRouter();

  const [createData, setCreateData] = useCreateTokenData();
  const resetCreateData = resetCreateTokenData();

  let contract: Contract = new ContractBuilder('Token');

  useEffect(() => {
    console.log(createData);
  }, [createData]);

  const code = useMemo(() => {
    const opts: any = {};

    switch (createData.type) {
      case TOKEN_TYPE.ERC20:
        opts.kind = 'ERC20';
        opts.name = createData.metadata.erc20.name;
        opts.symbol = createData.metadata.erc20.symbol;
        opts.premint = createData.metadata.erc20.initialMint.toString();
        opts.mintable = createData.feature.erc20.mintable;
        opts.burnable = createData.feature.erc20.burnable;
        opts.pausable = createData.feature.erc20.pausable;
        opts.snapshots = createData.feature.erc20.snapshot;
        opts.votes = createData.feature.erc20.votes;
        opts.permit = createData.feature.erc20.permit;
        opts.access = createData.accessControl.erc20;
        console.log('erc20');
        break;

      case TOKEN_TYPE.ERC721:
        opts.kind = 'ERC721';
        opts.name = createData.metadata.erc721.name;
        opts.symbol = createData.metadata.erc721.symbol;
        opts.baseUri = createData.metadata.erc721.baseURI;
        opts.enumerable = createData.feature.erc721.enumerable;
        opts.uriStorage = createData.feature.erc721.uriStorage;
        opts.burnable = createData.feature.erc721.burnable;
        opts.pausable = createData.feature.erc721.pausable;
        opts.mintable = createData.feature.erc721.mintable;
        opts.incremental = createData.feature.erc721.autoIncrementId;
        opts.votes = createData.feature.erc721.votes;
        opts.access = createData.accessControl.erc721;
        break;
      case TOKEN_TYPE.ERC1155:
        opts.kind = 'ERC1155';
        opts.name = createData.metadata.erc1155.name;
        opts.uri = createData.metadata.erc1155.uri;
        opts.burnable = createData.feature.erc1155.burnable;
        opts.pausable = createData.feature.erc1155.pausable;
        opts.mintable = createData.feature.erc1155.mintable;
        opts.supply = createData.feature.erc1155.supplyTracking;
        opts.updatableUri = createData.feature.erc1155.updatableURI;
        opts.access = createData.accessControl.erc1155;
        break;
    }

    opts.securityContact = createData.information.securityContact;
    opts.license = createData.information.license;

    contract = buildGeneric(opts);

    const code = printContract(contract);
    const highlight = injectHyperlinks(hljs.highlight('solidity', code).value);
    return code;
  }, [createData]);

  const onChangeTokenType = useCallback(
    (type: TOKEN_TYPE) => {
      setCreateData({
        ...createData,
        type,
        metadata: initialMetaData,
        feature: initialFeature,
        accessControl: initialAccessControl,
        information: initialInformation,
      });
    },
    [createData, resetCreateData, setCreateData]
  );

  const onChangeMetadata = useCallback(
    (key: string, value: any) => {
      const type = createData.type;

      setCreateData({
        ...createData,
        metadata: Object.assign(
          { ...createData.metadata },
          {
            [`${type}`]: Object.assign(
              { ...createData.metadata[type] },
              { [`${key}`]: value }
            ),
          }
        ),
      });
    },
    [createData, setCreateData]
  );

  const onChangeFeature = useCallback(
    (
      key: string,
      state: boolean,
      requireKey?: string,
      oppositeKey?: string
    ) => {
      const type = createData.type;

      setCreateData({
        ...createData,
        feature: Object.assign(
          { ...createData.feature },
          {
            [`${type}`]: Object.assign(
              { ...createData.feature[type] },
              { [`${key}`]: state },
              { [`${requireKey}`]: true },
              { [`${oppositeKey}`]: false }
            ),
          }
        ),
      });
    },
    [createData, setCreateData]
  );

  const onChangeAccessControl = useCallback(
    (value: string) => {
      const type = createData.type;

      setCreateData({
        ...createData,
        accessControl: Object.assign(
          { ...createData.accessControl },
          {
            [`${type}`]: value,
          }
        ),
      });
    },
    [createData, setCreateData]
  );

  const onChangeInformation = useCallback(
    (key: string, value: string) => {
      const type = createData.type;

      setCreateData({
        ...createData,
        information: Object.assign(
          { ...createData.information },
          { [`${key}`]: value }
        ),
        [`${key}`]: value,
      });
    },
    [createData, setCreateData]
  );

  return (
    <>
      <NextSeo title="Token Manager" />
      <DashboardLayout>
        <div className="grid sm:pt-5 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">
          <div className="hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block">
            <Setting
              onChangeTokenType={onChangeTokenType}
              onChangeMetadata={onChangeMetadata}
              onChangeFeature={onChangeFeature}
              onChangeAccessControl={onChangeAccessControl}
              onChangeInformation={onChangeInformation}
            />
          </div>

          <div className="mx-5 mt-5">
            <div className="text-right">
              <Button
                shape="rounded"
                variant="solid"
                color="info"
                className=" dark:bg-gray-800"
              >
                DEPLOY
              </Button>
            </div>
            <div className="mt-5 flex grow flex-col  rounded-lg  bg-white p-5 shadow-card dark:bg-light-dark">
              <pre className="flex grow basis-0 flex-col ">
                <code>{code}</code>
                {/* <code
                  className={classNames('grow overflow-auto p-4', hljs)}
                  dangerouslySetInnerHTML={{ __html: code }}
                ></code> */}
              </pre>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default TokenManager;
