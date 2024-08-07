import { useLocalNotes, useWebNotes, useWebUser } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";
import { LocalNote } from "@/types";
import { Menu } from "@mantine/core";
import { IconCloudPlus, IconCubePlus, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteMenuProps {
  note: LocalNote
}

const NoteMenu: FC<NoteMenuProps> = ({ note }: NoteMenuProps) => {
  const { deleteNote, convertToWeb, convertToBlock } = useLocalNotes();
  const { createNote: createWebNote } = useWebNotes();
  const { isConnected: isWebConnected } = useWebUser();
  const { isConnected: isBlockConnected, createNote: createBlockNote } = useBlockNotes();

  return (
    <Menu.Dropdown>
      {
        isBlockConnected &&
        <Menu.Item onClick={e => {
          e.stopPropagation();
          convertToBlock(note, createBlockNote);
        }} leftSection={<IconCubePlus size={16} />}>
          Convert to Block Note
        </Menu.Item>
      }
      {
        isWebConnected &&
        <Menu.Item onClick={e => {
          e.stopPropagation();
          convertToWeb(note, createWebNote);
        }} leftSection={<IconCloudPlus size={16} />}>
          Convert to Web Note
        </Menu.Item>
      }
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