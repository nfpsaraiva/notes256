import React, { createContext, useContext, useMemo, ReactNode } from 'react';

interface ContractAddressProviderProps {
  children: ReactNode;
}

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ContractAddressContext = createContext<string>('');

export const ContractAddressProvider: React.FC<ContractAddressProviderProps> = ({ children }) => {
  const contractAddress = useMemo(() => CONTRACT_ADDRESS, []);

  return (
    <ContractAddressContext.Provider value={contractAddress}>
      {children}
    </ContractAddressContext.Provider>
  );
};

export const useContractAddress = (): string => {
  const context = useContext(ContractAddressContext);
  if (context === null) {
    throw new Error('useContractAddress must be used within an ContractAddressProvider');
  }
  return context;
};
