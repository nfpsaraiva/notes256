import { Proof } from "@/types";
import { Button, CopyButton, Divider, Image, Modal, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface ProofModalProps {
  opened: boolean,
  close: () => void,
  proof: Proof
}

const ProofModal: FC<ProofModalProps> = ({ opened, close, proof }: ProofModalProps) => {
  return (
    <Modal
      size={"md"}
      padding={0}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Image h={200} src={proof.image} />
      <Stack gap={"lg"} p={"md"}>
        <Title order={2} size={"h3"}>{proof.name}</Title>
        <Stack gap={"xs"}>
          <Text size="xs" fw={500}>
            Issuer: {proof.issuer}
          </Text>
          <Text size="xs" fw={500}>
            Date: {proof.date.toLocaleDateString()} {proof.date.toLocaleTimeString()}
          </Text>
        </Stack>
        <Divider />
        <ScrollArea h={200}>
          <Text size="sm">
            {proof.description}
          </Text>
        </ScrollArea>
        <CopyButton value={proof.id}>
          {({ copied, copy }) => (
            <Button onClick={copy}>
              {copied ? 'Copied' : 'Copy ID'}
            </Button>
          )}
        </CopyButton>
      </Stack>
    </Modal>
  )
}

export default ProofModal;