import { useProofs } from "@/hooks";
import { ActionIcon, Button, Card, Center, CopyButton, Grid, Group, Image, Menu, SimpleGrid, Stack, Text, TextInput, Title, Tooltip, UnstyledButton } from "@mantine/core";
import { FC, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import WalletButton from "../Wallet/WalletButton";
import { IconCopy, IconDots, IconDownload, IconFilter, IconSend, IconShare, IconTrash } from "@tabler/icons-react";

const Proofs: FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { proofs } = useProofs(address);
  const [searchValue, setSearchValue] = useState('');

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

  const filteredProofs = proofs.filter(proof => {
    return proof.name.includes(searchValue) || proof.description.includes(searchValue);
  });

  return (
    <Stack gap={"xl"}>
      <TextInput
        placeholder="Search"
        size="md"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }}>
        {
          filteredProofs.map(proof => {
            return (
              <Card radius={"md"} h={290} key={proof.id} padding={"lg"} withBorder shadow="sm">
                <Card.Section>
                  <Image height={50} src={proof.image} />
                </Card.Section>
                <Stack mt={"md"} justify="space-between" h={"100%"}>
                  <Stack gap={"xs"}>
                    <Group justify="space-between" wrap="nowrap" align="baseline">
                      <Text fw={500}>{proof.name}</Text>
                      <Menu>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="var(--mantine-color-text)">
                            <IconDots size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconCopy size={16} />}>Copy ID</Menu.Item>
                          <Menu.Item leftSection={<IconDownload size={16} />}>Download</Menu.Item>
                          <Menu.Item leftSection={<IconSend size={16} />}>Transfer</Menu.Item>
                          <Menu.Item color="red" leftSection={<IconTrash size={16} />}>Delete</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                    <Text lineClamp={3} c={"dimmed"} size="sm">
                      {proof.description}
                    </Text>
                  </Stack>
                  <Button size="xs" fw={700}>Open</Button>
                </Stack>
              </Card>
            )
          })
        }
      </SimpleGrid>
    </Stack>
  )
}

export default Proofs;