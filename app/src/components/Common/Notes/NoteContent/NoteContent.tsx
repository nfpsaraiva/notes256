import { Note } from "@/types";
import { ActionIcon, Group, Menu, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconDots, IconDotsVertical, IconMenu, IconMenu2, IconTrash } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

interface NoteContentProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>,
  noteMenu: ReactNode
}

const NoteContent: FC<NoteContentProps> = ({
  note,
  expanded = false,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  noteMenu
}: NoteContentProps) => {
  const formatedDate = <Text c={"dimmed"} size="xs" fw={500}>
    {
      new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
    }
  </Text>

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
                {note.date && formatedDate}
              </Stack>
            )
            : (
              <Group justify="space-between">
                <Stack gap={4}>
                  {
                    note.name !== "" &&
                    <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{note.name}</Title>
                  }
                  {note.date && formatedDate}
                </Stack>
                <Menu radius={"lg"}>
                  <Menu.Target>
                    <ActionIcon onClick={e => e.stopPropagation()} variant="transparent" size={"xl"}>
                      <IconDotsVertical size={20} />
                    </ActionIcon>
                  </Menu.Target>
                  {noteMenu}
                </Menu>
              </Group>
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