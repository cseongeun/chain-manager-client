import {
  CreateTokenData,
  TOKEN_TYPE,
  useCreateTokenData,
} from '../../../atoms/token-manager';
import cn from 'classnames';

type FeatureProps = {
  onChangeFeature: (
    key: string,
    state: boolean,
    requiredKey?: string,
    oppositeKey?: string
  ) => void;
};

type FeatureTypeProps = {
  createData: CreateTokenData;
  onChangeFeature: (
    key: string,
    state: boolean,
    requiredKey?: string,
    oppositeKey?: string
  ) => void;
};

type FeatureCheckBoxProps = {
  value: boolean;
  onChange: any;
  name: string;
  className?: any;
};

const FeatureCheckBox = ({
  value,
  onChange,
  name,
  className,
}: FeatureCheckBoxProps) => {
  return (
    <label
      className={cn('ml-2 mt-2 mb-2 block font-bold text-gray-500', className)}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <span className="ml-2 py-2 text-sm leading-snug text-gray-600">
        {name}
      </span>
    </label>
  );
};

const ERC20Feature = ({ createData, onChangeFeature }: FeatureTypeProps) => {
  return (
    <>
      <FeatureCheckBox
        name="mintable"
        onChange={(e) => onChangeFeature('mintable', e)}
        value={createData.feature.erc20.mintable}
      />
      <FeatureCheckBox
        name="burnable"
        onChange={(e) => onChangeFeature('burnable', e)}
        value={createData.feature.erc20.burnable}
      />
      <FeatureCheckBox
        name="pausable"
        onChange={(e) => onChangeFeature('pausable', e)}
        value={createData.feature.erc20.pausable}
      />
      <FeatureCheckBox
        name="permit"
        onChange={(e) => onChangeFeature('permit', e)}
        value={createData.feature.erc20.permit}
      />
      <FeatureCheckBox
        name="votes"
        onChange={(e) => onChangeFeature('votes', e)}
        value={createData.feature.erc20.votes}
      />
      <FeatureCheckBox
        name="snapshot"
        onChange={(e) => onChangeFeature('snapshot', e)}
        value={createData.feature.erc20.snapshot}
      />
    </>
  );
};

const ERC721Feature = ({ createData, onChangeFeature }: FeatureTypeProps) => {
  return (
    <>
      <FeatureCheckBox
        name="mintable"
        onChange={(e) =>
          onChangeFeature('mintable', e, null, 'autoIncrementId')
        }
        value={createData.feature.erc721.mintable}
      />
      <FeatureCheckBox
        name="autoIncrementId"
        onChange={(e) => {
          onChangeFeature('autoIncrementId', e, 'mintable');
        }}
        className={'ml-7'}
        value={createData.feature.erc721.autoIncrementId}
      />
      <FeatureCheckBox
        name="pausable"
        onChange={(e) => onChangeFeature('pausable', e)}
        value={createData.feature.erc721.pausable}
      />
      <FeatureCheckBox
        name="burnable"
        onChange={(e) => onChangeFeature('burnable', e)}
        value={createData.feature.erc721.burnable}
      />
      <FeatureCheckBox
        name="votes"
        onChange={(e) => onChangeFeature('votes', e)}
        value={createData.feature.erc721.votes}
      />
      <FeatureCheckBox
        name="enumerable"
        onChange={(e) => onChangeFeature('enumerable', e)}
        value={createData.feature.erc721.enumerable}
      />
      <FeatureCheckBox
        name="uriStorage"
        onChange={(e) => onChangeFeature('uriStorage', e)}
        value={createData.feature.erc721.uriStorage}
      />
    </>
  );
};

const ERC1155Feature = ({ createData, onChangeFeature }: FeatureTypeProps) => {
  return (
    <>
      <FeatureCheckBox
        name="mintable"
        onChange={(e) => onChangeFeature('mintable', e)}
        value={createData.feature.erc1155.mintable}
      />
      <FeatureCheckBox
        name="burnable"
        onChange={(e) => onChangeFeature('burnable', e)}
        value={createData.feature.erc1155.burnable}
      />
      <FeatureCheckBox
        name="pausable"
        onChange={(e) => onChangeFeature('pausable', e)}
        value={createData.feature.erc1155.pausable}
      />
      <FeatureCheckBox
        name="supplyTracking"
        onChange={(e) => onChangeFeature('supplyTracking', e)}
        value={createData.feature.erc1155.supplyTracking}
      />
      <FeatureCheckBox
        name="updatableURI"
        onChange={(e) => onChangeFeature('updatableURI', e)}
        value={createData.feature.erc1155.updatableURI}
      />
    </>
  );
};

const Feature = ({ onChangeFeature }: FeatureProps) => {
  const [createData] = useCreateTokenData();

  return (
    <div className="p-5">
      {createData.type == TOKEN_TYPE.ERC20 && (
        <ERC20Feature
          createData={createData}
          onChangeFeature={onChangeFeature}
        />
      )}
      {createData.type == TOKEN_TYPE.ERC721 && (
        <ERC721Feature
          createData={createData}
          onChangeFeature={onChangeFeature}
        />
      )}
      {createData.type == TOKEN_TYPE.ERC1155 && (
        <ERC1155Feature
          createData={createData}
          onChangeFeature={onChangeFeature}
        />
      )}
    </div>
  );
};

export default Feature;
