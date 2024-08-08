import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconMenu } from "@tabler/icons-react";
import { FC } from "react";
import { BlockNote, LocalNote, Note, WebNote } from "@/types";
import { NoteType } from "@/enums";
import { NoteMenu as LocalNoteMenu } from "@/components/LocalNotes";
import { NoteMenu as WebNoteMenu } from "@/components/WebNotes";
import { NoteMenu as BlockNoteMenu } from "@/components/BlockNotes";

interface NoteMenuProps {
  note: Note,
  openNoteTransferForm: () => void
}

const NoteMenu: FC<NoteMenuProps> = ({ note, openNoteTransferForm }: NoteMenuProps) => {
  const getMenu = () => {
    switch (note.type) {
      case NoteType.LOCAL:
        return <LocalNoteMenu note={note as LocalNote} />
      case NoteType.WEB:
        return <WebNoteMenu note={note as WebNote} />
      default:
        return <BlockNoteMenu note={note as BlockNote} openNoteTransferForm={openNoteTransferForm} />
    }
  }

  return (
    <Menu radius={"xl"}>
      <Menu.Target>
        <UnstyledButton px={0} py={"xs"} onClick={e => e.stopPropagation()}>
          <Group gap={"xs"} wrap="nowrap">
            <IconMenu size={18} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      {getMenu()}
    </Menu>
  )
}

export default NoteMenu;