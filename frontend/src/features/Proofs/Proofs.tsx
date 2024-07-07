import { useProofs } from "@/hooks";
import { Accordion, Button, Center, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import WalletButton from "../Wallet/WalletButton";
import classes from "./Proofs.module.css";
import { IconCopy, IconDownload, IconShare } from "@tabler/icons-react";

const Proofs: FC = () => {
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

  if (!proofs || proofs.length === 0) {
    return (
      <Center h={"70vh"}>
        <Title ta={"center"} fw={500} order={2}>
          No proofs here!
        </Title>
      </Center> 
    )
  }

  return (
    <Stack>
      <Accordion variant="separated">
        {
          proofs &&
          proofs.map(proof => {
            return (
              <Accordion.Item className={classes.proof} value={proof.id} key={proof.id}>
                <Accordion.Control>
                  <Group justify="space-between">
                    <Stack gap={3}>
                      <Title order={5}>{proof.name} (#{proof.id})</Title>
                      <Text size="xs" c={"dimmed"}>{proof.timestamp}</Text>
                    </Stack>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    <Text size="sm">{proof.description}</Text>
                    <Divider />
                    <Group>
                      <Button fw={700} size="xs" leftSection={<IconDownload stroke={3} size={16} />} variant="filled">
                        NFT
                      </Button>
                      <Button size="xs" color="var(--mantine-color-text)" leftSection={<IconShare size={16} />} variant="subtle">
                        Share
                      </Button>
                      <Button size="xs" color="var(--mantine-color-text)" leftSection={<IconCopy size={16} />} variant="subtle">
                        Copy ID
                      </Button>
                    </Group>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </Stack>
  )
}

export default Proofs;