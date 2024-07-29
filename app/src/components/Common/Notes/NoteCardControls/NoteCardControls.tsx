import { Note } from "@/types";
import { ActionIcon, Button, Group, Menu } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteCardControlsProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  deleteNote: (note: Note) => Promise<void>,
}

const NoteCardControls: FC<NoteCardControlsProps> = ({
  note,
  expanded,
  newTitle,
  newDescription,
  deleteNote
}: NoteCardControlsProps) => {

  return (
    <Group justify="space-between">
      <Menu width={"target"} radius={"lg"} position="top">
        <Menu.Target>
          <ActionIcon w={"100%"} onClick={e => e.stopPropagation()} variant="transparent" mx={"auto"}>
            <IconDots />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconTrash size={18} color="red" />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {/* <Button onClick={() => deleteNote(note)}>Delete</Button> */}
    </Group>
  )
}

export default NoteCardControls;