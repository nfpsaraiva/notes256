import { AppShell, Box, Burger, Button, Container, Group, Stack, Textarea, Title } from '@mantine/core';
import classes from './Home.module.css';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { ColorSchemeToggle, CreateProofButton, MyProofs, WalletButton } from '@/features';
import { SidebarToggle } from '@/components';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

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
              {
                opened && <SidebarToggle toggle={toggle} />
              }
              <Title size={"h2"}>Title</Title>
            </Group>
            <WalletButton />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} className={classes.navbar}>
        <AppShell.Section p={"md"}>
          <Group justify='space-between'>
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title size={"h3"}>Sidebar</Title>
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
          <MyProofs />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Container maw={800} mx={"auto"}>
          <CreateProofButton />
        </Container>
      </AppShell.Main>
      <AppShell.Footer className={classes.footer} withBorder={false}>
      </AppShell.Footer>
    </AppShell>
  );
}
