import { useBlockNotes } from "@/hooks";
import { Button, Group, Image, Modal, Stack, Text, Title } from "@mantine/core";
import { IconExternalLink, IconUser } from "@tabler/icons-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import envs from "@/envs";
import { shortifyAddress } from "@/utils/NotesUtils";

const PublicBlockNote: FC = () => {
  const { noteId } = useParams();
  const { blockNotes } = useBlockNotes(noteId);
  const { CONTRACT_ADDRESS } = envs;

  if (blockNotes === undefined) return <></>

  const blockNote = blockNotes[0];

  return (
    <Modal opened={true} onClose={() => { }} withCloseButton={false} padding={0} radius={"xl"}>
      <Image src={"https://ipfs.filebase.io/ipfs/QmTcWnGBeYX1GRCybjvgGFq3vg74VrstWyeFDnPF3KBvLB"} />
      <Stack p={"lg"}>
        <Stack gap={4}>
          <Title size={"h4"}>
            {blockNote.name}
          </Title>
          <Text size="xs" c={"dimmed"}>
            {blockNote.date.toLocaleDateString()} {blockNote.date.toLocaleTimeString()}
          </Text>
        </Stack>
        <Text size="sm">
          {blockNote.description}
        </Text>
        <Group justify="space-between">
          <Button
            leftSection={<IconUser size={14} />}
            variant="subtle"
            size="xs"
            radius={"lg"}
            component="a"
            target="_blank"
            href={`https://sepolia.etherscan.io/address/${blockNote.owner}`}
          >
            {shortifyAddress(blockNote.owner)}

          </Button>
          <Button
            leftSection={<IconExternalLink size={14} />}
            variant="subtle"
            radius={"lg"}
            size="xs"
            component="a"
            target="_blank"
            href={`https://sepolia.etherscan.io/nft/${CONTRACT_ADDRESS}/${blockNote.tokenId}`}
          >
            Blockchain
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default PublicBlockNote;