import { useTransferNote } from "@/hooks";
import { Note } from "@/types";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { FC, useState } from "react";

interface TransferModalProps {
  opened: boolean,
  close: () => void
  note: Note
}

const TransferModal: FC<TransferModalProps> = ({
  opened,
  close,
  note
}: TransferModalProps) => {
  const { transferNote } = useTransferNote();
  const [transferToAddress, setTransferToAddress] = useState<string>('');

  return (
    <Modal centered keepMounted opened={opened} title="Transfer" onClose={close} radius={"lg"}>
      <Stack>

        <TextInput
          label="Address"
          description="This will transfer the ownership of this note to the given address"
          required
          value={transferToAddress}
          onChange={e => setTransferToAddress(e.target.value)}
        />
        <Button
          onClick={() => transferNote({ to: transferToAddress, tokenId: note.tokenId })}
          radius={"lg"}
        >
          Send
        </Button>
      </Stack>
    </Modal>
  )
}

export default TransferModal;