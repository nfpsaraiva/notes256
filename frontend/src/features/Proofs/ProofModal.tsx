import { Proof } from "@/types";
import { Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { FC } from "react";

interface ProofModalProps {
  opened: boolean,
  close: () => void,
  proof: Proof
}

const ProofModal: FC<ProofModalProps> = ({ opened, close, proof }: ProofModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title={proof.name}>
      <Stack>
        <Text size="sm">
          {proof.description}
        </Text>
        <Text c={"dimmed"} size="xs">
          ID: {proof.id}
        </Text>
        <Divider />
        <Group>
          <Button>Send</Button>
          <Button>Copy ID</Button>
          <Button>Download</Button>
          <Button color="red">Delete</Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default ProofModal;