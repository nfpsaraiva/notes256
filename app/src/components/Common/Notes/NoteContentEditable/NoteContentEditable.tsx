import { Note } from "@/types";
import { Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteMenu from "../NoteMenu/NoteMenu";

interface NoteContentEditableProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>,
  noteMenuIcon: ReactNode
}

const NoteContentEditable: FC<NoteContentEditableProps> = ({
  note,
  expanded = false,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  noteMenuIcon
}: NoteContentEditableProps) => {
  const formatedDate = <Text c={"dimmed"} size="xs" fw={500}>
    {
      new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
    }
  </Text>

  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        <Group justify="space-between">
          <Stack gap={4} flex={1}>
            <TextInput
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              variant="unstyled"
              placeholder="Name"
              fw={600}
            />
            {note.date && formatedDate}
          </Stack>
          <NoteMenu note={note} noteMenuIcon={noteMenuIcon} />
        </Group>
      </Stack>
      <Textarea
        value={newDescription}
        onChange={e => setNewDescription(e.target.value)}
        rows={5}
        minRows={5}
        autosize
        variant="unstyled"
        placeholder="Take a note"
        fw={300}
        size="sm"
        lh={1.6}
        maxLength={256}
      />

    </Stack>
  )
}

export default NoteContentEditable;