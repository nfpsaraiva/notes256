import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import { Note } from "@/types";
import { NoteCard } from "@/components/Note";

interface NotesListProps {
  notes: Note[]
}

const NotesList: FC<NotesListProps> = ({ notes }: NotesListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        notes.map(note => <NoteCard key={note.id} note={note} />)
      }
    </SimpleGrid>
  )
}

export default NotesList;