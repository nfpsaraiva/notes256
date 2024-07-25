import { useTransferNft } from "@/features/Nfts/hooks";
import { Nft } from "@/types";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { FC, useState } from "react";

interface TransferModalProps {
  opened: boolean,
  close: () => void
  nft: Nft
}

const TransferModal: FC<TransferModalProps> = ({
  opened,
  close,
  nft
}: TransferModalProps) => {
  const { transferNft } = useTransferNft();
  const [transferToAddress, setTransferToAddress] = useState<string>('');

  return (
    <Modal keepMounted opened={opened} title="Transfer" onClose={close} radius={"lg"}>
      <Stack>

        <TextInput
          label="Address"
          description="This will transfer the ownership of this nft to the given address"
          required
          value={transferToAddress}
          onChange={e => setTransferToAddress(e.target.value)}
        />
        <Button
          onClick={() => transferNft({ to: transferToAddress, tokenId: nft.tokenId })}
          radius={"lg"}
        >
          Send
        </Button>
      </Stack>
    </Modal>
  )
}

export default TransferModal;