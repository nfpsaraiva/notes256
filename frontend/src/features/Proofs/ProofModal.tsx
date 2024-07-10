import { Proof } from "@/types";
import { Group, Image, Modal, ScrollArea, Stack, Text, Title } from "@mantine/core";
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
      <Image h={200} src={proof.image} />
      <Stack p={"md"}>
        <Title order={2} size={"h3"}>{proof.name}</Title>
        <Text size="sm">
          {proof.description}
        </Text>
        <Group justify="space-between">
          <Text c={"dimmed"} size="xs">
            {proof.id}
          </Text>
          <Text size="xs">
            {proof.date.toLocaleDateString()} {proof.date.toLocaleTimeString()}
          </Text>
        </Group>
      </Stack>
    </Modal>
  )
}

export default ProofModal;