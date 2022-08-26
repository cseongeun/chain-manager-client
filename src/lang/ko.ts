import { ILangKey } from './lang.interface';

const resource: ILangKey = {
  error: {
    invalid_address: '유효하지 않은 주소 형식입니다.',
    invalid_contract_address: '유효하지 않은 컨트랙트 주소입니다.',
    invalid_abi: '유효하지 않은 ABI 형식입니다.',
  },
  toast: {
    add_contract_execution: '컨트랙트가 추가되었습니다.',
    switch_network: '네트워크를 변경해주세요.',
  },
  item: {
    edit: '수정',
    delete: '삭제',
    read: '읽기',
    write: '쓰기',
    contract_name: '컨트랙트 명',
    network: '네트워크',
    address: '주소',
  },
};

export default resource;
