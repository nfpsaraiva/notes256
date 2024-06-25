import { AppShell, Burger, Button, Center, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import classes from './Home.module.css';
import { useDisclosure } from '@mantine/hooks';
import ColorSchemeToggle from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import CreateProofButton from '@/features/CreateProof/CreateProofButton';
import VerifyProofButton from '@/features/VerifyProof/VerifyProofButton';


export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title>Provify</Title>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.control}>Support</UnstyledButton>
              <ColorSchemeToggle />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>

      </AppShell.Navbar>

      <AppShell.Main>
        <Center h={"75vh"}>
          <Stack gap={"xl"} align='center'>
            <Stack gap={3}>
              <Title order={2}>
                Secure Blockchain Proof Issuance and Verification Made Simple
              </Title>
            </Stack>
            <Group gap={"xs"}>
              <CreateProofButton />
              <VerifyProofButton />
            </Group>
          </Stack>
        </Center>
      </AppShell.Main>
    </AppShell>

  );
}
