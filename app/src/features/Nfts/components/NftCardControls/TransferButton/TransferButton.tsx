import { Nft } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { FC } from "react";

interface TransferButtonProps {
  nft: Nft,
  openModal: () => void
}

const TransferNft: FC<TransferButtonProps> = ({ nft, openModal }: TransferButtonProps) => {
  const openTransferModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    openModal()
  }

  return (
    <>
      <Tooltip label="Transfer nft">
        <ActionIcon variant="subtle" size={"lg"} onClick={e => openTransferModal(e)}>
          <IconSend size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export default TransferNft;