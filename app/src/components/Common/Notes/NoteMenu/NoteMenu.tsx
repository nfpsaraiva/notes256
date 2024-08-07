import { BlockNote, LocalNote, Note, WebNote } from "@/types";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconMenu } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import classes from "./NoteMenu.module.css";
import { NoteType } from "@/enums";
import { NoteMenu as LocalNoteMenu } from "@/components/LocalNotes";
import { NoteMenu as WebNoteMenu } from "@/components/WebNotes";
import { NoteMenu as BlockNoteMenu } from "@/components/BlockNotes";

interface NoteMenuProps {
  note: Note
  noteMenuIcon: ReactNode
}

const NoteMenu: FC<NoteMenuProps> = ({ note, noteMenuIcon }: NoteMenuProps) => {
  const getMenu = () => {
    switch (note.type) {
      case NoteType.LOCAL:
        return <LocalNoteMenu note={note as LocalNote} />
      case NoteType.WEB:
        return <WebNoteMenu note={note as WebNote} />
      default:
        return <BlockNoteMenu note={note as BlockNote} />
    }
  }

  return (
    <Menu radius={"lg"}>
      <Menu.Target>
        <UnstyledButton px={"md"} py={"xs"} className={classes.target} onClick={e => e.stopPropagation()}>
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