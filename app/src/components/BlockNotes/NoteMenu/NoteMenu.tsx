import { useLocalNotes } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";
import { BlockNote, LocalNote } from "@/types";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteMenuProps {
  note: BlockNote
}

const NoteMenu: FC<NoteMenuProps> = ({ note }: NoteMenuProps) => {
  const { deleteNote } = useBlockNotes();

  return (
    <Menu.Dropdown>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        deleteNote(note);
      }} leftSection={<IconTrash size={16} />} color="red">
        Delete
      </Menu.Item>
    </Menu.Dropdown>
  )
}

export default NoteMenu;