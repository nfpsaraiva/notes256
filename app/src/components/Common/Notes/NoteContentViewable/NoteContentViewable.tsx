import { Note } from "@/types";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import envs from "@/envs";

interface NoteContentViewableProps {
  note: Note,
  newTitle: string,
  newDescription: string,
}

const NoteContentViewable: FC<NoteContentViewableProps> = ({
  note,
  newTitle,
  newDescription,
}: NoteContentViewableProps) => {
  const { NOTE_TITLE_MAX_LENGTH, NOTE_CONTENT_MAX_LENGTH } = envs;

  const formatedDate = <Text c={"dimmed"} size="xs" fw={500}>
    {
      new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
    }
  </Text>

  return (
    <Stack gap={"xs"} h={"100%"} mih={300}>
      <Stack gap={"sm"} flex={1}>
        <Group justify="space-between">
          <Badge size="sm" variant="transparent" px={0}>
            {note.type}
          </Badge>
        </Group>
        <Group justify="space-between">
          <Text fw={600}>
            {newTitle}
          </Text>
          <Text size="xs" c={"dimmed"} fw={500}>{newTitle.length}/{NOTE_TITLE_MAX_LENGTH}</Text>
        </Group>
      </Stack>
      <Text fw={300} size="sm" lh={1.6}>
        {newDescription}
      </Text>
      <Group justify="space-between" align="start">
        <Stack>
          <Text>{note.date && formatedDate}</Text>
          <Text c={"dimmed"} fw={500} size="xs">{note.owner}</Text>
        </Stack>
        <Text size="xs" c={"dimmed"} fw={500}>{newDescription.length}/{NOTE_CONTENT_MAX_LENGTH}</Text>
      </Group>
    </Stack>
  )
}

export default NoteContentViewable;