import { Proof } from "@/types";
import { Button, Divider, Group, Image, Modal, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface ProofModalProps {
  opened: boolean,
  close: () => void,
  proof: Proof
}

const ProofModal: FC<ProofModalProps> = ({ opened, close, proof }: ProofModalProps) => {
  return (
    <Modal
      padding={0}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Image src={proof.image} />
      <Stack p={"md"}>
        <Title order={2} size={"h3"}>{proof.name}</Title>
        <Text size="sm">
          {proof.description}
        </Text>
        <Text c={"dimmed"} size="xs">
          ID: {proof.id}
        </Text>
        <Divider />
        <Group>
          <Button>Transfer</Button>
          <Button>Copy ID</Button>
          <Button>Download</Button>
          <Button color="red">Delete</Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default ProofModal;