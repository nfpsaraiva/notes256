import { BlockNote, LocalNote, WebNote } from "@/types";
import { Button, Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import PublishButton from "./PublishButton/PublishButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

interface NoteCardControlsProps {
  note: LocalNote | WebNote | BlockNote,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  deleteNote: (note: LocalNote | WebNote | BlockNote) => Promise<void>,
}

const NoteCardControls: FC<NoteCardControlsProps> = ({
  note,
  expanded,
  newTitle,
  newDescription,
  deleteNote
}: NoteCardControlsProps) => {

  return (
    <Group justify="space-between">
      <Button onClick={() => deleteNote(note)}>Delete</Button>
    </Group>
  )
}

export default NoteCardControls;