import { useProofs } from "@/hooks";
import { Card, Center, Group, Stack, Text, Textarea, Title } from "@mantine/core";
import { FC } from "react";
import { useWalletInfo, useWeb3ModalAccount } from "@web3modal/ethers/react";
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
    <Stack>
      {
        proofs &&
        proofs.map(proof => {
          return (
            <Card>
              <Group>
                <Text>Proof ID:</Text>
                <Text>{proof.tokenId}</Text>
              </Group>
            </Card>
          )
        })
      }
    </Stack>
  )
}

export default MyProofs;