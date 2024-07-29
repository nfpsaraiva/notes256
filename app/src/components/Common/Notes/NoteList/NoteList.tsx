import { Note } from "@/types";
import { SimpleGrid } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteCard from "../NoteCard/NoteCard";

interface NoteListProps {
  notes: Note[],
  updateNote: (note: Note) => Promise<void>,
  noteMenuIcon: ReactNode
}

const NoteList: FC<NoteListProps> = ({
  notes,
  updateNote,
  noteMenuIcon
}: NoteListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        notes.map(note => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              updateNote={updateNote}
              noteMenuIcon={noteMenuIcon}
            />
          )
        })
      }
    </SimpleGrid>
  )
}

export default NoteList;