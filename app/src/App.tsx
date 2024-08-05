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
import { UserbaseProvider } from './contexts/UserbaseContext';
import { Auth0Provider } from "@auth0/auth0-react";
import envs from "@/envs";

export default function App() {
  const queryClient = new QueryClient();

  const auth0Config = {
    domain: envs.AUTH0_CLIENT_ID,
    clientId: envs.AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }

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
      <Auth0Provider {...auth0Config}>
        <ModalsProvider>
          <UserbaseProvider>
            <AlchemyProvider>
              <QueryClientProvider client={queryClient}>
                <Router />
              </QueryClientProvider>
            </AlchemyProvider>
          </UserbaseProvider>
        </ModalsProvider>
      </Auth0Provider>
    </MantineProvider>
  );
}
