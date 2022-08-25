import { ILangKey } from './lang.interface';

const resource: ILangKey = {
  error: {
    invalid_address: '유효하지 않은 주소 형식입니다.',
    invalid_contract_address: '유효하지 않은 컨트랙트 주소입니다.',
    invalid_abi: '유효하지 않은 ABI 형식입니다.',
  },
  info: {
    success_add_contract_execution: '컨트랙트 생성에 성공하였습니다.',
  },
};

export default resource;
