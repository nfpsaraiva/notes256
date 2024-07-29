import { Note } from "@/types";
import { Button, Group } from "@mantine/core";
import { FC } from "react";

interface NoteCardControlsProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  deleteNote: (note: Note) => Promise<void>,
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