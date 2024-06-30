import { ActionIcon, Affix, AppShell, Badge, Burger, Button, Card, Center, Group, Space, Stack, Text, TextInput, Textarea, Title, UnstyledButton } from '@mantine/core';
import classes from './Home.module.css';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { ColorSchemeToggle, CreateProofButton, VerifyProofButton, WalletButton } from '@/features';
import { IconBulb, IconLayoutSidebar, IconPlus, IconSearch, IconUpload } from '@tabler/icons-react';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
  });

  const lastIdeas = [
  ]

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
            <Title size={"h3"}>My Ideas</Title>
            <WalletButton />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" px={4}>
        <AppShell.Section>
          <Group justify='space-between'>
            <Button variant='subtle' leftSection={<IconSearch size={16} />}>
              Search ideas
            </Button>
            <Group>
              <ColorSchemeToggle />
              <ActionIcon onClick={toggle} variant='subtle' size={"lg"}>
                <IconLayoutSidebar size={24} />
              </ActionIcon>
            </Group>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow py={"lg"}>
          <Stack gap={"xl"}>

            <Stack>
              <UnstyledButton>How it works</UnstyledButton>
              <UnstyledButton>Support</UnstyledButton>
              <UnstyledButton>About</UnstyledButton>
            </Stack>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        {/* <Stack maw={800} mx={"auto"} gap={"xl"}>
          <Stack gap={3} align='center'>
            <Title ta={"center"} fw={500} order={2}>
              Get your intellectual property
            </Title>
            <Text ta={"center"} c={"dimmed"}>
              <strong>Write</strong> and <strong>Publish</strong> your original ideas to the <strong>Blockchain</strong>
            </Text>
          </Stack>
          <Textarea
            placeholder='Write your idea'
            miw={350}
            rows={1}
            autosize
            autoFocus
          />
          <Button
            leftSection={<IconUpload size={16} stroke={3} />}
          >
            Submit
          </Button>
        </Stack> */}
        <CreateProofButton />
      </AppShell.Main>
    </AppShell>

  );
}
