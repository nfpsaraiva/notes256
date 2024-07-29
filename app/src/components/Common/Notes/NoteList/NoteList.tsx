import { Note } from "@/types";
import { SimpleGrid } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { NoteMenu } from "@/components/BlockNotes";

interface NoteListProps {
  notes: Note[],
  updateNote: (note: Note) => Promise<void>,
  deleteNote: (note: Note) => Promise<void>,
  noteMenu: ReactNode
}

const NoteList: FC<NoteListProps> = ({ notes, updateNote, deleteNote, noteMenu }: NoteListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        notes.map(note => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              updateNote={updateNote}
              deleteNote={deleteNote}
              noteMenu={noteMenu}
            />
          )
        })
      }
    </SimpleGrid>
  )
}

export default NoteList;