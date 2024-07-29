import { Note } from "@/types";
import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import NoteCard from "../NoteCard/NoteCard";

interface NoteListProps {
  notes: Note[],
  updateNote: (note: Note) => Promise<void>,
  deleteNote: (note: Note) => Promise<void>,
}

const NoteList: FC<NoteListProps> = ({ notes, updateNote, deleteNote }: NoteListProps) => {
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
            />
          )
        })
      }
    </SimpleGrid>
  )
}

export default NoteList;