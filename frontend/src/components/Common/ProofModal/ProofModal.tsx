import { useDeleteProof, useTransferProof } from "@/hooks";
import { Proof } from "@/types";
import { Button, CopyButton, Divider, Image, Modal, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

interface ProofModalProps {
  opened: boolean,
  close: () => void,
  proof: Proof
}

const ProofModal: FC<ProofModalProps> = ({ opened, close, proof }: ProofModalProps) => {
  const { deleteProof } = useDeleteProof();
  const { transferProof } = useTransferProof();
  const [transferModalOpened, transferModalHandle] = useDisclosure(false);
  const [transferToAddress, setTransferToAddress] = useState<string>('');

  return (
    <Modal
      size={"md"}
      padding={0}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal opened={transferModalOpened} title="Transfer" onClose={transferModalHandle.close}>
        <TextInput
          value={transferToAddress}
          onChange={e => setTransferToAddress(e.target.value)}
        />
        <Button onClick={() => transferProof({to: transferToAddress, tokenId: proof.tokenId})}>Send</Button>
      </Modal>
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
        <Stack gap={"xs"}>
          <CopyButton value={proof.id}>
            {({ copied, copy }) => (
              <Button onClick={copy}>
                {copied ? 'Copied' : 'Copy ID'}
              </Button>
            )}
          </CopyButton>
          <Button onClick={transferModalHandle.open}>Transfer</Button>
          <Button color="red" onClick={() => deleteProof(Number(proof.tokenId))}>Delete</Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default ProofModal;