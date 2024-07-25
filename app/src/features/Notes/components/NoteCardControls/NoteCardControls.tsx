import { Note } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import PublishButton from "./PublishButton/PublishButton";

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
  return (
    <Group justify="space-between">
      <PublishButton note={note} />
      <DeleteButton note={note} />
    </Group>
  )
}

export default NoteCardControls;