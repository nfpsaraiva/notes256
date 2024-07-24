import { Note } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import TransferNote from "./TransferButton/TransferButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import CopyButton from "./CopyButton/CopyButton";
import OwnerButton from "./OwnerButton/OwnerButton";
import MenuButton from "./MenuButton/MenuButton";

interface NoteCardControlsProps {
  note: Note,
  openTransferModal: () => void
}

const NoteCardControls: FC<NoteCardControlsProps> = ({
  note,
  openTransferModal
}: NoteCardControlsProps) => {
  const { address } = useWeb3ModalAccount();

  const isOwner = address === note.owner;

  return (
    <Group justify="space-between">
      <Group gap={"xs"} flex={1}>
        <CopyButton note={note} />
        {isOwner && <TransferNote note={note} openModal={openTransferModal} />}
        {isOwner && <DeleteButton note={note} />}
        <MenuButton note={note} />
      </Group>
      <Group>
        <OwnerButton note={note} />
      </Group>
    </Group>
  )
}

export default NoteCardControls;