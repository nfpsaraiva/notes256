import { useProofs } from "@/hooks";
import { ActionIcon, Button, Card, Center, Group, Image, Menu, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import WalletButton from "../Wallet/WalletButton";
import { IconDots, IconDownload, IconShare, IconTrash } from "@tabler/icons-react";

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
    <Group align="baseline" justify="space-around">
      {
        proofs &&
        proofs.map(proof => {
          return (
            <Card radius={"md"} w={350} h={300} key={proof.id} padding={"lg"} withBorder shadow="sm">
              <Card.Section>
                <Image height={50} src={proof.image} />
              </Card.Section>
              <Stack mt={"md"} justify="space-between" h={"100%"}>
                <Stack gap={"xs"}>
                  <Group justify="space-between" wrap="nowrap">
                    <Text fw={500}>{proof.name}</Text>
                    <Menu>
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="var(--mantine-color-text)">
                          <IconDots size={18} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<IconDownload size={16} />}>Download</Menu.Item>
                        <Menu.Item leftSection={<IconShare size={16} />}>Share</Menu.Item>
                        <Menu.Item color="red" leftSection={<IconTrash size={16} />}>Delete</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                  <Text lineClamp={3} c={"dimmed"} size="sm">
                    {proof.description}
                  </Text>
                </Stack>
                <Stack>
                  <Text size="xs" c={"dimmed"}>ID: 0x4f6Cdf8d088a1d3c1174F688059D79Bf93007573</Text>
                  <Button>Open</Button>
                </Stack>
              </Stack>
            </Card>
          )
        })
      }
    </Group>
  )
}

export default Proofs;