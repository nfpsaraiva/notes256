import { Note } from "@/types";
import { Badge, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteMenu from "../NoteMenu/NoteMenu";
import envs from "@/envs";
import { shortifyAddress } from "@/utils/NotesUtils";

interface NoteContentEditableProps {
  note: Note,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>,
  openNoteTransferForm: () => void
}

const NoteContentEditable: FC<NoteContentEditableProps> = ({
  note,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  openNoteTransferForm
}: NoteContentEditableProps) => {
  const { NOTE_TITLE_MAX_LENGTH, NOTE_CONTENT_MAX_LENGTH } = envs;

  const formatedDate = <Text c={"dimmed"} size="xs" fw={500}>
    {
      new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
    }
  </Text>

  return (
    <Stack gap={"xs"} h={"100%"}>
      <Stack gap={"sm"} flex={1}>
        <Group justify="space-between">
          <Badge size="sm" variant="transparent" px={0}>
            {note.type}
          </Badge>
          <NoteMenu note={note} openNoteTransferForm={openNoteTransferForm} />
        </Group>
        <Group justify="space-between">
          <TextInput
            flex={1}
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            variant="unstyled"
            placeholder="Name"
            fw={600}
            maxLength={NOTE_TITLE_MAX_LENGTH}
          />
          <Text size="xs" c={"dimmed"} fw={500}>{newTitle.length}/{NOTE_TITLE_MAX_LENGTH}</Text>
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
        maxLength={NOTE_CONTENT_MAX_LENGTH}
      />
      <Stack>
        <Group justify="flex-end">
          <Text size="xs" c={"dimmed"} fw={500}>{newDescription.length}/{NOTE_CONTENT_MAX_LENGTH}</Text>
        </Group>
        <Group justify="space-between" align="start" wrap="nowrap">
          <Text>{note.date && formatedDate}</Text>
          {
            note.owner &&
            <Text c={"dimmed"} fw={500} size="xs">{shortifyAddress(note.owner)}</Text>
          }
        </Group>
      </Stack>
    </Stack>
  )
}

export default NoteContentEditable;