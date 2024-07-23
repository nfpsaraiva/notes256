import { useTransferDraft } from "@/hooks";
import { Draft } from "@/types";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { FC, useState } from "react";

interface TransferModalProps {
  opened: boolean,
  close: () => void
  Draft: Draft
}

const TransferModal: FC<TransferModalProps> = ({
  opened,
  close,
  Draft
}: TransferModalProps) => {
  const { transferDraft } = useTransferDraft();
  const [transferToAddress, setTransferToAddress] = useState<string>('');

  return (
    <Modal centered keepMounted opened={opened} title="Transfer" onClose={close} radius={"lg"}>
      <Stack>

        <TextInput
          label="Address"
          description="This will transfer the ownership of this Draft to the given address"
          required
          value={transferToAddress}
          onChange={e => setTransferToAddress(e.target.value)}
        />
        <Button
          onClick={() => transferDraft({ to: transferToAddress, tokenId: draft.tokenId })}
          radius={"lg"}
        >
          Send
        </Button>
      </Stack>
    </Modal>
  )
}

export default TransferModal;