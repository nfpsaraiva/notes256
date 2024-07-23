import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlchemyProvider } from './contexts/AlchemyContext';
import { createWeb3Modal } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { ModalsProvider } from '@mantine/modals';

export default function App() {
  const queryClient = new QueryClient();

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
    themeMode: "light"
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme='light'>
      <Notifications />
      <ModalsProvider>
        <AlchemyProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </AlchemyProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
