import { useLocalNotes, useWebNotes, useWebUser } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";
import { BlockNote } from "@/types";
import { CopyButton, Menu } from "@mantine/core";
import { IconCloudPlus, IconCopy, IconDeviceMobilePlus, IconFileUpload, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface NoteMenuProps {
  note: BlockNote,
  openNoteTransferForm: () => void
}

const NoteMenu: FC<NoteMenuProps> = ({ note, openNoteTransferForm }: NoteMenuProps) => {
  const { deleteNote, convertToWeb, convertToLocal } = useBlockNotes();
  const { createNote: createWebNote } = useWebNotes();
  const { createNote: createLocalNote } = useLocalNotes();
  const { isConnected: isWebConnected } = useWebUser();

  return (
    <Menu.Dropdown>
      <CopyButton value={`${window.location.href}/${note.id}`}>
        {({ copied, copy }) => (
          <Menu.Item leftSection={<IconCopy size={16} />} onClick={e => {
            e.stopPropagation();
            copy();
          }}>
            {copied ? 'Copied' : 'Copy URL'}
          </Menu.Item>
        )}
      </CopyButton>
      <Menu.Item onClick={e => {
        e.stopPropagation();
        openNoteTransferForm();
      }} leftSection={<IconFileUpload size={16} />}>
        Transfer
      </Menu.Item>
      {
        isWebConnected &&
        <Menu.Item onClick={e => {
          e.stopPropagation();
          convertToWeb(note, createWebNote);
        }} leftSection={<IconCloudPlus size={16} />}>
          Convert to Web Note
        </Menu.Item>
      }
      <Menu.Item onClick={e => {
        e.stopPropagation();
        convertToLocal(note, createLocalNote);
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