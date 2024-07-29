import { Note } from "@/types";
import { ActionIcon, Group, Menu, Stack, Text, Title } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import NoteMenu from "../NoteMenu/NoteMenu";

interface NoteContentProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>,
  deleteNote: (note: Note) => Promise<void>,
  noteMenuIcon: ReactNode
}

const NoteContent: FC<NoteContentProps> = ({
  note,
  expanded = false,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  deleteNote,
  noteMenuIcon
}: NoteContentProps) => {
  const formatedDate = <Text c={"dimmed"} size="xs" fw={500}>
    {
      new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
    }
  </Text>

  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        <Group justify="space-between">
          <Stack gap={4}>
            {
              note.name !== "" &&
              <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{note.name}</Title>
            }
            {note.date && formatedDate}
          </Stack>
          <NoteMenu note={note} noteMenuIcon={noteMenuIcon} deleteNote={deleteNote} />
        </Group>
      </Stack>
      <Text fw={400} lineClamp={5} size="sm" lh={1.6}>
        {note.description}
      </Text>
    </Stack>
  )
}

export default NoteContent;