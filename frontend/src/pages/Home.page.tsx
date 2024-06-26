import { AppShell, Burger, Center, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import classes from './Home.module.css';
import { useDisclosure } from '@mantine/hooks';
import CreateProofButton from '@/features/CreateProof/CreateProofButton';
import VerifyProofButton from '@/features/VerifyProof/VerifyProofButton';
import { IconCertificate } from '@tabler/icons-react';
import WalletButton from '@/features/Wallet/WalletButton';
import { createWeb3Modal } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';

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
      header={{ height: 90 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={0} justify="space-between" style={{ flex: 1 }}>
            <Title size={"h2"}>Provify</Title>
            <Group>
              <Group gap="xs" visibleFrom="sm">
                <UnstyledButton className={classes.control}>How it works</UnstyledButton>
                <UnstyledButton className={classes.control}>Team</UnstyledButton>
                <UnstyledButton className={classes.control}>About</UnstyledButton>
              </Group>
              <WalletButton />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>How it works</UnstyledButton>

      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Center h={"75vh"} maw={800} mx={"auto"}>
          <Stack gap={"xl"} align='center'>
            <Stack gap={3}>
              <Title ta={"center"} fw={500} order={2}>
                <strong>Create</strong> and <strong>Verify</strong> proofs secured by the <strong>Blockchain</strong>
              </Title>
              <Text ta={"center"} c={"dimmed"}>Upload text, images, etc and receive an NFT certificate as a proof of that information</Text>
            </Stack>
            <Group gap={"xs"} justify='center'>
              <CreateProofButton />
              <VerifyProofButton />
            </Group>
          </Stack>
        </Center>
      </AppShell.Main>
    </AppShell>

  );
}
