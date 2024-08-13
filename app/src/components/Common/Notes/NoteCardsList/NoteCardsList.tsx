import { Note, TransferedNote } from "@/types";
import { SimpleGrid } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteCard from "../NoteCard/NoteCard";

interface NoteCardsListProps {
  notes: Note[],
  updateNote: (note: Note) => void,
  transfer: (transferedNote: TransferedNote) => void,
  transfering: boolean,
}

const NoteCardsList: FC<NoteCardsListProps> = ({
  notes,
  updateNote,
  transfer,
  transfering,
}: NoteCardsListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        notes.map(note => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              updateNote={updateNote}
              transfer={transfer}
              transfering={transfering}
            />
          )
        })
      }
    </SimpleGrid>
  )
}

export default NoteCardsList;