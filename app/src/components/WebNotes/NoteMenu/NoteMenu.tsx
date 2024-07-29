import { useLocalNotes, useWebNotes } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";
import { WebNote } from "@/types";
import { Menu } from "@mantine/core";
import { IconDeviceMobile, IconGizmo, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteMenuProps {
  note: WebNote
}

const NoteMenu: FC<NoteMenuProps> = ({ note }: NoteMenuProps) => {
  const { deleteNote, convertToLocal, convertToBlock } = useWebNotes();
  const { createNote: createLocalNote } = useLocalNotes();
  const { createNote: createBlockNote } = useBlockNotes();

  return (
    <Menu.Dropdown>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        convertToBlock(note, createBlockNote)
      }} leftSection={<IconGizmo size={16} />}>
        Convert to Block
      </Menu.Item>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        convertToLocal(note, createLocalNote)
      }} leftSection={<IconDeviceMobile size={16} />}>
        Convert to Local
      </Menu.Item>
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