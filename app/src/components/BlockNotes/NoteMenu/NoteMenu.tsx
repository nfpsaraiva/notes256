import { useLocalNotes, useWebNotes } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";
import { BlockNote, LocalNote } from "@/types";
import { Menu } from "@mantine/core";
import { IconCloud, IconCloudPlus, IconDeviceMobile, IconDeviceMobilePlus, IconFileUpload, IconSend, IconShare, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteMenuProps {
  note: BlockNote
}

const NoteMenu: FC<NoteMenuProps> = ({ note }: NoteMenuProps) => {
  const { deleteNote, convertToWeb, convertToLocal, transferNote } = useBlockNotes();
  const { createNote: createWebNote } = useWebNotes();
  const { createNote: createLocalNote } = useLocalNotes();

  return (
    <Menu.Dropdown>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        transferNote(note, "");
      }} leftSection={<IconShare size={16} />}>
        Share
      </Menu.Item>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        transferNote(note, "");
      }} leftSection={<IconFileUpload size={16} />}>
        Transfer
      </Menu.Item>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        convertToWeb(note, createWebNote);
      }} leftSection={<IconCloudPlus size={16} />}>
        Create a Web Note
      </Menu.Item>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        convertToLocal(note, createLocalNote);
      }} leftSection={<IconDeviceMobilePlus size={16} />}>
        Create a Local Note
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