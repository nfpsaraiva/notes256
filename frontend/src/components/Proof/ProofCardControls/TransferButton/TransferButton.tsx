import { Proof } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { FC } from "react";

interface TransferButtonProps {
  proof: Proof,
  openModal: () => void
}

const TransferProof: FC<TransferButtonProps> = ({ proof, openModal }: TransferButtonProps) => {
  const openTransferModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    openModal()
  }

  return (
    <>
      <Tooltip label="Transfer proof">
        <ActionIcon variant="subtle" size={"lg"} onClick={e => openTransferModal(e)}>
          <IconSend size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export default TransferProof;