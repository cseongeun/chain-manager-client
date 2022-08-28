import Collapse from '@/components/ui/collapse';
import CollectionSelect from '@/components/ui/collection-select-list';
import { TOKEN_TYPE } from '../../../atoms/token-manager';
import AccessControl from './access-control';
import Feature from './feature';
import Information from './information';
import Metadata from './metadata';

import Type from './type';

type SettingProps = {
  onChangeTokenType: (type: TOKEN_TYPE) => void;
  onChangeMetadata: (key: string, value: any) => void;
  onChangeFeature: (
    key: string,
    state: boolean,
    requiredKey?: string,
    oppositeKey?: string
  ) => void;
  onChangeAccessControl: (
    key: string,
    state: boolean,
    oppositeKey?: string
  ) => void;
  onChangeInformation: (key: string, value: string) => void;
};

const Setting = ({
  onChangeTokenType,
  onChangeMetadata,
  onChangeFeature,
  onChangeAccessControl,
  onChangeInformation,
}: SettingProps) => {
  return (
    <>
      <Collapse label="Type" initialOpen>
        <Type onChangeTokenType={onChangeTokenType} />
      </Collapse>
      <Collapse label="Metadata" initialOpen>
        <Metadata onChangeMetadata={onChangeMetadata} />
      </Collapse>
      <Collapse label="Feature" initialOpen>
        <Feature onChangeFeature={onChangeFeature} />
      </Collapse>
      <Collapse label="AccessControl" initialOpen>
        <AccessControl onChangeAccessControl={onChangeAccessControl} />
      </Collapse>
      <Collapse label="Information" initialOpen>
        <Information onChangeInformation={onChangeInformation} />
      </Collapse>
    </>
  );
};

export default Setting;
