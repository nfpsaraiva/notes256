import { Note } from "@/types";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import envs from "@/envs";
import NoteContentFooter from "../NoteContentFooter/NoteContentFooter";

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
        <Text fw={300} size="sm" lh={1.6}>
          {newDescription}
        </Text>
      </Stack>
      <NoteContentFooter
        note={note}
        descriptionLength={newDescription.length}
        descriptionMaxLength={NOTE_CONTENT_MAX_LENGTH}
      />
    </Stack>
  )
}

export default NoteContentViewable;