import {
  ACCESS_CONTRACT_TYPE,
  CreateTokenData,
  TOKEN_TYPE,
  useCreateTokenData,
} from '../../../atoms/token-manager';
import cn from 'classnames';

type AccessControlProps = {
  onChangeAccessControl: (value: string) => void;
};

type AccessControlTypeProps = {
  createData: CreateTokenData;
  onChangeAccessControl: (key: string) => void;
};

type AccessControlCheckBoxProps = {
  value: string;
  onChange: any;
  name: string;
  className?: any;
};

const AccessControlCheckBox = ({
  value,
  onChange,
  name,
  className,
}: AccessControlCheckBoxProps) => {
  return (
    <label
      className={cn('ml-2 mt-2 mb-2 block font-bold text-gray-500', className)}
    >
      <input
        type="checkbox"
        checked={value == name}
        onChange={(e) => {
          onChange(name);
        }}
      />
      <span className="ml-2 py-2 text-sm leading-snug text-gray-600">
        {name}
      </span>
    </label>
  );
};

const ERC20AccessControl = ({
  createData,
  onChangeAccessControl,
}: AccessControlTypeProps) => {
  return (
    <>
      <AccessControlCheckBox
        name={ACCESS_CONTRACT_TYPE.OWNABLE}
        onChange={(e) => onChangeAccessControl(ACCESS_CONTRACT_TYPE.OWNABLE)}
        value={createData.accessControl.erc20}
      />
      <AccessControlCheckBox
        name={ACCESS_CONTRACT_TYPE.ROLES}
        onChange={(e) => onChangeAccessControl(ACCESS_CONTRACT_TYPE.ROLES)}
        value={createData.accessControl.erc20}
      />
    </>
  );
};

const ERC721AccessControl = ({
  createData,
  onChangeAccessControl,
}: AccessControlTypeProps) => {
  return (
    <>
      <AccessControlCheckBox
        name={ACCESS_CONTRACT_TYPE.OWNABLE}
        onChange={(e) => onChangeAccessControl(ACCESS_CONTRACT_TYPE.OWNABLE)}
        value={createData.accessControl.erc721}
      />
      <AccessControlCheckBox
        name={ACCESS_CONTRACT_TYPE.ROLES}
        onChange={(e) => onChangeAccessControl(ACCESS_CONTRACT_TYPE.ROLES)}
        value={createData.accessControl.erc721}
      />
    </>
  );
};

const ERC1155AccessControl = ({
  createData,
  onChangeAccessControl,
}: AccessControlTypeProps) => {
  return (
    <>
      <AccessControlCheckBox
        name={ACCESS_CONTRACT_TYPE.OWNABLE}
        onChange={(e) => onChangeAccessControl(ACCESS_CONTRACT_TYPE.OWNABLE)}
        value={createData.accessControl.erc1155}
      />
      <AccessControlCheckBox
        name={ACCESS_CONTRACT_TYPE.ROLES}
        onChange={(e) => onChangeAccessControl(ACCESS_CONTRACT_TYPE.ROLES)}
        value={createData.accessControl.erc1155}
      />
    </>
  );
};

const AccessControl = ({ onChangeAccessControl }: AccessControlProps) => {
  const [createData] = useCreateTokenData();

  return (
    <div className="p-5">
      {createData.type == TOKEN_TYPE.ERC20 && (
        <ERC20AccessControl
          createData={createData}
          onChangeAccessControl={onChangeAccessControl}
        />
      )}
      {createData.type == TOKEN_TYPE.ERC721 && (
        <ERC721AccessControl
          createData={createData}
          onChangeAccessControl={onChangeAccessControl}
        />
      )}
      {createData.type == TOKEN_TYPE.ERC1155 && (
        <ERC1155AccessControl
          createData={createData}
          onChangeAccessControl={onChangeAccessControl}
        />
      )}
    </div>
  );
};

export default AccessControl;
