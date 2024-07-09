import { AppShell as MantineAppShell, Box, Burger, Center, Container, Divider, Group, ScrollArea, Stack, Text, Title } from '@mantine/core';
import classes from './AppShell.module.css';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { ColorSchemeToggle, CreateProofButton, Menu, Proofs, WalletButton } from '@/features';
import { SidebarToggle } from '@/components';
import envs from "@/envs";
import TopMenu from '@/features/Menu/TopMenu';
import { FC } from 'react';

interface AppShellProps {
  children: any
}

const AppShell: FC<AppShellProps> = ({ children }: AppShellProps) => {
  const [opened, { toggle }] = useDisclosure();
  const { isConnected } = useWeb3ModalAccount();
  const { APP_VERSION } = envs;

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
    themeMode: "light"
  });

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: opened, mobile: !opened } }}
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Header className={classes.header} withBorder={false}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={0} justify="space-between" style={{ flex: 1 }}>
            <Group>
              {opened && <SidebarToggle toggle={toggle} />}
              <Title size={"h3"}>My proofs</Title>
            </Group>
            {isConnected && <WalletButton />}
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar withBorder={false} className={classes.navbar}>
        <MantineAppShell.Section p={"md"}>
          <Group justify='space-between'>
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title size={"h3"}>Provify</Title>
            </Group>
            <Group>
              <ColorSchemeToggle />
              <Box visibleFrom="sm">
                <SidebarToggle toggle={toggle} />
              </Box>
            </Group>
          </Group>
        </MantineAppShell.Section>
        <MantineAppShell.Section grow p={"md"} component={ScrollArea}>
          <TopMenu />
        </MantineAppShell.Section>
        <MantineAppShell.Section p={"md"}>
          <Stack>
            <Divider />
            <Menu />
          </Stack>
        </MantineAppShell.Section>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main className={classes.main}>
        {children}
      </MantineAppShell.Main>

      <MantineAppShell.Footer className={classes.footer} withBorder={false} py={"md"}>
        <Center h={"100%"}>
          <Text size='xs'>Version <strong>{APP_VERSION}</strong> on <strong>{import.meta.env.VITE_CHAIN_NAME}</strong> Blockchain Network</Text>
        </Center>
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
}

export default AppShell;