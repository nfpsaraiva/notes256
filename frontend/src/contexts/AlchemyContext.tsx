import React, { createContext, useContext, useMemo, ReactNode, FC } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

interface AlchemyProviderProps {
  children: ReactNode;
}

const AlchemyContext = createContext<Alchemy | null>(null);

const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

export const AlchemyProvider: FC<AlchemyProviderProps> = ({ 
  children 
}: AlchemyProviderProps) => {
  const alchemy = useMemo(() => new Alchemy(config), []);

  return (
    <AlchemyContext.Provider value={alchemy}>
      {children}
    </AlchemyContext.Provider>
  );
};

export const useAlchemy = (): Alchemy => {
  const context = useContext(AlchemyContext);
  if (context === null) {
    throw new Error('useAlchemy must be used within an AlchemyProvider');
  }
  return context;
};
