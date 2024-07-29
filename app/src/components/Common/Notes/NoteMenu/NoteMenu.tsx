import { Note } from "@/types";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import classes from "./NoteMenu.module.css"

interface NoteMenuProps {
  note: Note
  noteMenuIcon: ReactNode
  deleteNote: (note: Note) => Promise<void>
}

const NoteMenu: FC<NoteMenuProps> = ({ note, noteMenuIcon, deleteNote }: NoteMenuProps) => {
  return (
    <Menu radius={"lg"}>
      <Menu.Target>
        <UnstyledButton p={"xs"} className={classes.target} onClick={e => e.stopPropagation()}>
          <Group gap={"xs"}>
            {noteMenuIcon}
            <IconChevronDown size={20} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={e => {
          e.stopPropagation();
          deleteNote(note);
        }} leftSection={<IconTrash size={18} />} color="red">
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default NoteMenu;