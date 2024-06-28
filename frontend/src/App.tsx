import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlchemyProvider } from './contexts/AlchemyContext';

export default function App() {
  const queryClient = new QueryClient()

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <Notifications />
      <AlchemyProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AlchemyProvider>
    </MantineProvider>
  );
}
