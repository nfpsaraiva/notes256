import { Note } from "@/types";
import { ScrollArea, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface NoteContentProps {
  note: Note,
  expanded: boolean
}

const NoteContent: FC<NoteContentProps> = ({ note, expanded = false }: NoteContentProps) => {
  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{note.name}</Title>
        {
          note.date &&
          <Text c={"dimmed"} size="xs" fw={500}>
            {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
          </Text>
        }
      </Stack>
      {
        expanded
          ? <ScrollArea h={300}>
            <Text fw={300} size="xs" lh={1.6}>
              {note.description}
            </Text>
          </ScrollArea>
          : <Text fw={400} lineClamp={5} size="xs" lh={1.6}>
            {note.description}
          </Text>
      }
    </Stack>
  )
}

export default NoteContent;