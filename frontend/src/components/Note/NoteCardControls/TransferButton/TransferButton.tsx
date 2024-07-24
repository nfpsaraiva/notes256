import { Note } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { FC } from "react";

interface TransferButtonProps {
  note: Note,
  openModal: () => void
}

const TransferNote: FC<TransferButtonProps> = ({ note, openModal }: TransferButtonProps) => {
  const openTransferModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    openModal()
  }

  return (
    <>
      <Tooltip label="Transfer note">
        <ActionIcon variant="subtle" size={"lg"} onClick={e => openTransferModal(e)}>
          <IconSend size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export default TransferNote;