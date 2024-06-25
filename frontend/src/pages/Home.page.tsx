import { Button, Center, Stack, Text, Title } from '@mantine/core';

export function HomePage() {
  return (
    <Center h={"100vh"}>
      <Stack gap={"xl"}>
        <Stack gap={3}>
          <Title>Provify</Title>
          <Text c={"dimmed"}>Decentralized proof issuer</Text>
        </Stack>
        <Stack gap={"xs"}>
          <Button>Create</Button>
          <Button color='teal'>Verify</Button>
        </Stack>
      </Stack>
    </Center>
  );
}
