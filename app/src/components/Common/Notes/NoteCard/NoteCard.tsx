import { Box, Card, LoadingOverlay } from "@mantine/core";
import { FC, ReactNode, useState } from "react";
import classes from "./NoteCard.module.css";
import { BlockNote, Note, TransferedNote } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";
import NoteTransferForm from "../NoteTransferForm/NoteTransferForm";
import { NoteType } from "@/enums";
import { AddToWalletModal } from "@/components/BlockNotes";

interface NoteCardProps {
  note: Note,
  updateNote: (note: Note) => void,
  transfer: (transferedNote: TransferedNote) => void,
  transfering: boolean,
}

const NoteCard: FC<NoteCardProps> = ({
  note,
  updateNote,
  transfer,
  transfering,
}: NoteCardProps) => {
  const [noteCardExpandedOpened, noteCardExpandedHandle] = useDisclosure(false);
  const [noteTransferFormOpened, noteTransferFormHandle] = useDisclosure(false);
  const [addToWalletOpened, addToWalletHandle] = useDisclosure(false);
  const [loadingNoteCard, setLoadingNoteCard] = useState(false);

  return (
    <>
      <Box pos={"relative"}>
        <LoadingOverlay visible={loadingNoteCard} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Card onClick={noteCardExpandedHandle.open} className={classes.NoteCard} radius={"xl"} h={280} padding={"lg"} withBorder shadow="md">
          <NoteContent
            note={note}
            expanded={false}
            openNoteTransferForm={noteTransferFormHandle.open}
            openAddToWallet={addToWalletHandle.open}
            setLoadingNoteCard={setLoadingNoteCard}
            closeNoteCardExpanded={() => { }}
          />
        </Card>
      </Box>
      <NoteCardExpanded
        opened={noteCardExpandedOpened}
        close={noteCardExpandedHandle.close}
        note={note}
        updateNote={updateNote}
        openNoteTransferForm={noteTransferFormHandle.open}
        setLoadingNoteCard={setLoadingNoteCard}
        openAddToWallet={addToWalletHandle.open}
      />
      <NoteTransferForm
        opened={noteTransferFormOpened}
        close={noteTransferFormHandle.close}
        note={note}
        transfer={transfer}
        transfering={transfering}
      />
      {
        note.type === NoteType.BLOCK &&
        <AddToWalletModal
          note={note as BlockNote}
          opened={addToWalletOpened}
          close={addToWalletHandle.close}
        />
      }
    </>
  )
}

export default NoteCard;