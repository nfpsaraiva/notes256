import { Draft } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { FC } from "react";

interface TransferButtonProps {
  Draft: Draft,
  openModal: () => void
}

const TransferDraft: FC<TransferButtonProps> = ({ Draft, openModal }: TransferButtonProps) => {
  const openTransferModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    openModal()
  }

  return (
    <Tooltip label="Transfer Draft">
      <ActionIcon variant="subtle" size={"lg"} onClick={e => openTransferModal(e)}>
        <IconSend size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default TransferDraft;