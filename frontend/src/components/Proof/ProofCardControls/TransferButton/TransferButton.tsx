import { useTransferProof } from "@/hooks";
import { Proof } from "@/types";
import { ActionIcon, Button, Modal, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSend } from "@tabler/icons-react";
import { FC, useState } from "react";

interface TransferButtonProps {
  proof: Proof
}

const TransferProof: FC<TransferButtonProps> = ({ proof }: TransferButtonProps) => {
  const { transferProof } = useTransferProof();
  const [transferModalOpened, transferModalHandle] = useDisclosure(false);
  const [transferToAddress, setTransferToAddress] = useState<string>('');

  const openTransferModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    transferModalHandle.open()
  }

  return (
    <>
      <Tooltip label="Transfer proof">
        <ActionIcon variant="subtle" size={"lg"} onClick={e => openTransferModal(e)}>
          <IconSend size={16} />
        </ActionIcon>
      </Tooltip>
      <Modal keepMounted opened={transferModalOpened} title="Transfer" onClose={transferModalHandle.close}>
        <TextInput
          value={transferToAddress}
          onChange={e => setTransferToAddress(e.target.value)}
        />
        <Button onClick={() => transferProof({ to: transferToAddress, tokenId: proof.tokenId })}>Send</Button>
      </Modal>
    </>
  )
}

export default TransferProof;