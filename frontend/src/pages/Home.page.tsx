import { AppShell, Box, Burger, Center, Container, Group, Stack, Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { ColorSchemeToggle, CreateProofButton, Menu, Proofs, VerifyProofButton, WalletButton } from '@/features';
import { SidebarToggle } from '@/components';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  const { isConnected } = useWeb3ModalAccount();

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
  });

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'md', collapsed: { desktop: opened, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className={classes.header} withBorder={false}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={0} justify="space-between" style={{ flex: 1 }}>
            <Group>
              {opened && <SidebarToggle toggle={toggle} />}
              <Title size={"h3"}>My Ideas</Title>
            </Group>
            {isConnected && <WalletButton />}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} className={classes.navbar}>
        <AppShell.Section p={"md"}>
          <Group justify='space-between'>
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title size={"h3"}>Options</Title>
            </Group>
            <Group>
              <ColorSchemeToggle />
              <Box visibleFrom="sm">
                <SidebarToggle toggle={toggle} />
              </Box>
            </Group>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow p={"md"}>
          <Stack>
            <VerifyProofButton />
          </Stack>
        </AppShell.Section>
        <AppShell.Section p={"md"}>
          <Menu />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Container maw={800} mx={"auto"}>
          <Proofs />
          {isConnected && <CreateProofButton />}
        </Container>
      </AppShell.Main>
      <AppShell.Footer className={classes.footer} withBorder={false} py={"md"}>
        <Center>
          <Text size='xs'><strong>{import.meta.env.VITE_CHAIN_NAME}</strong> Blockchain Network</Text>
        </Center>
      </AppShell.Footer>
    </AppShell>
  );
}
