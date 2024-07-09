import { ActionIcon, Box, Card, Group, Image, Menu, Stack, Text } from "@mantine/core";
import { IconCopy, IconDots, IconDownload, IconSend, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./ProofCard.module.css";
import { Proof } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import ProofModal from "./ProofModal";

interface ProofCardProps {
  proof: Proof
}

const ProofCard: FC<ProofCardProps> = ({ proof }: ProofCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box key={proof.id}>
      <Card onClick={open} className={classes.proofCard} radius={"md"} h={300} padding={"lg"} withBorder shadow="md">
        <Card.Section>
          <Image height={50} src={proof.image} />
        </Card.Section>
        <Stack mt={"md"} justify="space-between" h={"100%"}>
          <Stack gap={"xs"}>
            <Group justify="space-between" wrap="nowrap" align="baseline">
              <Text fw={500}>{proof.name}</Text>
              <Menu>
                <Menu.Target>
                  <ActionIcon onClick={e => e.stopPropagation()} variant="subtle" color="var(--mantine-color-text)">
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
            <Text lineClamp={7} c={"dimmed"} size="sm">
              {proof.description}
            </Text>
          </Stack>
        </Stack>
      </Card>
      <ProofModal opened={opened} close={close} proof={proof} />
    </Box>
  )
}

export default ProofCard;