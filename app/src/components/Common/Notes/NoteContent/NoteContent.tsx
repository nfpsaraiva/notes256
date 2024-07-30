import { Note } from "@/types";
import { Group, Stack, Text, Title } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteMenu from "../NoteMenu/NoteMenu";

interface NoteContentProps {
  note: Note,
  expanded: boolean,
  noteMenuIcon: ReactNode
}

const NoteContent: FC<NoteContentProps> = ({
  note,
  expanded = false,
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
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Stack gap={4} flex={1}>
            {
              note.name !== "" &&
              <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{note.name}</Title>
            }
            {note.date && formatedDate}
          </Stack>
          <NoteMenu note={note} noteMenuIcon={noteMenuIcon} />
        </Group>
      </Stack>
      <Text fw={400} lineClamp={5} size="sm" lh={1.6}>
        {note.description}
      </Text>
    </Stack>
  )
}

export default NoteContent;