import { useLocalNotes, useWebNotes } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";
import { WebNote } from "@/types";
import { Menu } from "@mantine/core";
import { IconCubePlus, IconDeviceMobile, IconDeviceMobilePlus, IconGizmo, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteMenuProps {
  note: WebNote
}

const NoteMenu: FC<NoteMenuProps> = ({ note }: NoteMenuProps) => {
  const { deleteNote, convertToLocal, convertToBlock } = useWebNotes();
  const { createNote: createLocalNote } = useLocalNotes();
  const { isConnected: isBlockConnected, createNote: createBlockNote } = useBlockNotes();

  return (
    <Menu.Dropdown>
      {
        isBlockConnected &&
        <Menu.Item onClick={e => {
          e.stopPropagation();
          convertToBlock(note, createBlockNote)
        }} leftSection={<IconCubePlus size={16} />}>
          Convert to Block Note
        </Menu.Item>
      }
      <Menu.Item onClick={e => {
        e.stopPropagation();
        convertToLocal(note, createLocalNote)
      }} leftSection={<IconDeviceMobilePlus size={16} />}>
        Convert to Local Note
      </Menu.Item>
      <Menu.Divider />
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