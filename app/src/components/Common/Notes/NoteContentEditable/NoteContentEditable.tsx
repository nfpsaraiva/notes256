import { Note } from "@/types";
import { Badge, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
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
    <Stack gap={"xs"} h={"100%"}>
      <Stack gap={0} flex={1}>
        <Group justify="space-between">
          <Badge size="sm" variant="transparent" px={0}>
            {note.type}
          </Badge>
          <NoteMenu note={note} noteMenuIcon={noteMenuIcon} />
        </Group>
        <TextInput
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          variant="unstyled"
          placeholder="Name"
          fw={600}
        />
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
        maxLength={1000}
      />
      <Text>
        {note.date && formatedDate}
      </Text>
    </Stack>
  )
}

export default NoteContentEditable;