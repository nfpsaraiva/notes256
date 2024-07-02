import { ActionIcon, AppShell, Burger, Group, Title } from '@mantine/core';
import classes from './Home.module.css';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { ColorSchemeToggle, CreateProofButton, MyProofs, WalletButton } from '@/features';
import { IconLayoutSidebar } from '@tabler/icons-react';

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
      navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className={classes.header} withBorder={false}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={0} justify="space-between" style={{ flex: 1 }}>
            <Title size={"h3"}>Ideas</Title>
            <WalletButton />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder>
        <AppShell.Section p={"md"}>
          <Group justify='space-between'>
            <Title size={"h3"}>Drafts</Title>
            <Group>
              <ColorSchemeToggle />
              <ActionIcon onClick={toggle} variant='subtle' size={"lg"}>
                <IconLayoutSidebar size={24} />
              </ActionIcon>
            </Group>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow p={"md"}>

        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main} maw={800} mx={"auto"}>
        <MyProofs />
        <CreateProofButton />
      </AppShell.Main>
    </AppShell>

  );
}
