import { Note } from "@/types";
import { Accordion, ActionIcon, Group, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FC } from "react";

interface NoteContentProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>
}

const NoteContent: FC<NoteContentProps> = ({
  note,
  expanded = false,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription
}: NoteContentProps) => {
  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        {
          expanded
            ? (
              <Stack gap={4}>
                <TextInput
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  variant="unstyled"
                  placeholder="Name"
                  fw={600}
                />
                {
                  note.date &&
                  <Text c={"dimmed"} size="xs" fw={500}>
                    {new Date(note.date).toLocaleDateString()} {new Date(note.date).toLocaleTimeString()}
                  </Text>
                }
              </Stack>
            )
            : (
              <Stack gap={4}>
                {
                  note.name !== "" &&
                  <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{note.name}</Title>
                }
                {
                  note.date &&
                  <Text c={"dimmed"} size="xs" fw={500}>
                    {new Date(note.date).toLocaleDateString()} {new Date(note.date).toLocaleTimeString()}
                  </Text>
                }
              </Stack>
            )
        }
      </Stack>
      {
        expanded
          ? <Textarea
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
            maxLength={500}
          />
          : <Text fw={400} lineClamp={5} size="sm" lh={1.6}>
            {note.description}
          </Text>
      }
    </Stack>
  )
}

export default NoteContent;