import { createContext, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export interface IWeb3Context {
  address: string;
  isConnected: boolean;
  connect: () => void;
  connectError: Error;
  isConnectError: boolean;
  disconnect: () => void;
}

export const Web3Context = createContext<IWeb3Context>({
  address: undefined,
  isConnected: undefined,
  connect: undefined,
  connectError: undefined,
  isConnectError: undefined,
  disconnect: undefined,
});

export const Web3MetamaskErrorCode = {
  4001: 'rejected the request.', // '사용자가 요청을 거부하였습니다.',
  4100: 'The requested method is not supported by this Ethereum provider.', //'요청한 계정 및/또는 방법이 사용자에 의해 승인되지 않았습니다.',
  4900: 'The provider is disconnected from all chains.', // 메타마스크가 연결되어있지 않음
  4901: 'The provider is disconnected from the specified chain.', // 지정된 체인에서 공급자 연결이 끊어져있음
  32700:
    'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.', 
  32600: 'The JSON sent is not a valid Request object.', 
  32601: 'The method does not exist / is not available.', // 컨트랙트에 해당 함수가 없음
  32602: 'Invalid method parameter(s).', // 매개변수가 유효하지않음
  32603: 'Internal JSON-RPC error.', // 여러가지 이유.
  32000: 'Invalid input.', // 입력 오류
  32001: 'Resource not found.', // 요청한 블록 체인 리소스가 없음, ex) 없는 블록 넘버 조회
  32002: 'Resource unavailable', // 요청 리소스가 존재하지만, 현재 사용할 수 없음 
  32003: 'Transaction rejected', //트랜잭션 실패 , 거부
  32004: 'Meethod not supported', // 지원되지 않는 방법
  32005: 'Request limit exceeed', // 속도 제한
};
