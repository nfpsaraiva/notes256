import { Note } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import PublishButton from "./PublishButton/PublishButton";
import ArchiveButton from "./ArchiveButton/ArchiveButton";
import { Status } from "../../enums";
import ActivateButton from "./ActivateButton/ActivateButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

interface NoteCardControlsProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
}

const NoteCardControls: FC<NoteCardControlsProps> = ({
  note,
  expanded,
  newTitle,
  newDescription
}: NoteCardControlsProps) => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <Group justify="space-between">
      <Group>
        {isConnected && <PublishButton note={note} />}
        {note.status === Status.ACTIVE && <ArchiveButton note={note} />}
        {(note.status === Status.ARCHIVED || note.status === Status.TRASHED)
          && <ActivateButton note={note} />}

      </Group>
      <DeleteButton note={note} />
    </Group>
  )
}

export default NoteCardControls;