import { createContext, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Web3Context } from '../contexts/web3-auth-context';

export default function Web3AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { address, isConnected } = useAccount();

  const {
    connect,
    isError: isConnectError,
    error: connectError,
  } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        connect,
        isConnectError: isConnectError,
        connectError,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
