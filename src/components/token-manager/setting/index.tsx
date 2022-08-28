import Collapse from '@/components/ui/collapse';
import CollectionSelect from '@/components/ui/collection-select-list';
import { TOKEN_TYPE } from '../../../atoms/token-manager';
import Feature from './feature';
import Metadata from './metadata';

import Type from './type';

type SettingProps = {
  onChangeTokenType: (type: TOKEN_TYPE) => void;
  onChangeMetadata: (key: string, value: any) => void;
  onChangeFeature: (key: string, state: boolean) => void;
};

const Setting = ({ onChangeTokenType, onChangeMetadata }: SettingProps) => {
  return (
    <>
      <Collapse label="Type" initialOpen>
        <Type onChangeTokenType={onChangeTokenType} />
      </Collapse>
      <Collapse label="Metadata" initialOpen>
        <Metadata onChangeMetadata={onChangeMetadata} />
      </Collapse>
      <Collapse label="Feature" initialOpen>
        <Feature />
      </Collapse>
    </>
  );
};

export default Setting;
