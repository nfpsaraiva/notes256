import { ActionIcon, Menu } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { FC } from "react";
import { BlockNote, LocalNote, Note, WebNote } from "@/types";
import { NoteType } from "@/enums";
import { NoteMenu as LocalNoteMenu } from "@/components/LocalNotes";
import { NoteMenu as WebNoteMenu } from "@/components/WebNotes";
import { NoteMenu as BlockNoteMenu } from "@/components/BlockNotes";

interface NoteMenuProps {
  note: Note,
  openNoteTransferForm: () => void,
  setLoadingNoteCard: React.Dispatch<React.SetStateAction<boolean>>,
  closeNoteCardExpanded: () => void,
  openAddToWallet: () => void
}

const NoteMenu: FC<NoteMenuProps> = ({ 
  note, 
  openNoteTransferForm, 
  setLoadingNoteCard,
  closeNoteCardExpanded,
  openAddToWallet
}: NoteMenuProps) => {
  const getMenu = () => {
    switch (note.type) {
      case NoteType.LOCAL:
        return <LocalNoteMenu note={note as LocalNote} />
      case NoteType.WEB:
        return <WebNoteMenu note={note as WebNote} />
      default:
        return <BlockNoteMenu
          note={note as BlockNote}
          openNoteTransferForm={openNoteTransferForm}
          setLoadingNoteCard={setLoadingNoteCard}
          closeNoteCardExpanded={closeNoteCardExpanded}
          openAddToWallet={openAddToWallet}
        />
    }
  }

  return (
    <Menu radius={"lg"}>
      <Menu.Target>
        <ActionIcon variant="subtle" size={"lg"} radius={"md"} onClick={e => e.stopPropagation()}>
          <IconMenu2 size={18} />
        </ActionIcon>
      </Menu.Target>
      {getMenu()}
    </Menu>
  )
}

export default NoteMenu;