import { useProofs } from "@/hooks";
import { Accordion, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import WalletButton from "../Wallet/WalletButton";

const MyProofs: FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { proofs } = useProofs(address);

  if (!isConnected) {
    return (
      <Center h={"70vh"}>
        <Stack>
          <Stack gap={3} align='center'>
            <Title ta={"center"} fw={500} order={2}>
              Get your intellectual property
            </Title>
            <Text ta={"center"} c={"dimmed"}>
              <strong>Write</strong> and <strong>Publish</strong> your original ideas to the <strong>Blockchain</strong>
            </Text>
          </Stack>
          <WalletButton />
        </Stack>
      </Center>
    )
  }

  if (!proofs) {
    return (
      <Center h={"70vh"}>
        <Stack>
          <Stack gap={3} align='center'>
            <Title ta={"center"} fw={500} order={2}>
              No proofs here!
            </Title>
            <Text ta={"center"} c={"dimmed"}>
              Start by creating drafts and then publish them
            </Text>
          </Stack>
        </Stack>
      </Center>
    )
  }

  return (
    <Accordion variant="separated">
      {
        proofs &&
        proofs.map(proof => {
          return (
            <Accordion.Item value={proof.id} key={proof.id}>
              <Accordion.Control>
                <Group justify="space-between">
                  <Stack gap={3}>
                    <Title order={5}>{proof.name}</Title>
                    <Text size="xs" c={"dimmed"}>{proof.description}</Text>
                  </Stack>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Group>
                  <Button size="xs">Download Certificate</Button>
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          )
        })
      }
    </Accordion>
  )
}

export default MyProofs;