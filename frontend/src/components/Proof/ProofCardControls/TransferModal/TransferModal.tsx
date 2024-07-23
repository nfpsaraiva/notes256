import { useTransferProof } from "@/hooks";
import { Proof } from "@/types";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { FC, useState } from "react";

interface TransferModalProps {
  opened: boolean,
  close: () => void
  proof: Proof
}

const TransferModal: FC<TransferModalProps> = ({
  opened,
  close,
  proof
}: TransferModalProps) => {
  const { transferProof } = useTransferProof();
  const [transferToAddress, setTransferToAddress] = useState<string>('');

  return (
    <Modal centered keepMounted opened={opened} title="Transfer" onClose={close} radius={"lg"}>
      <Stack>

        <TextInput
          label="Address"
          description="This will transfer the ownership of this proof to the given address"
          required
          value={transferToAddress}
          onChange={e => setTransferToAddress(e.target.value)}
        />
        <Button
          onClick={() => transferProof({ to: transferToAddress, tokenId: proof.tokenId })}
          radius={"lg"}
        >
          Send
        </Button>
      </Stack>
    </Modal>
  )
}

export default TransferModal;