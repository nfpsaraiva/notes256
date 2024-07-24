import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import { Note } from "@/types";
import NoteCard from "../NoteCard/NoteCard";

interface NoteListProps {
  notes: Note[]
}

const NoteList: FC<NoteListProps> = ({ notes }: NoteListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        notes.map(note => <NoteCard key={note.id} note={note} />)
      }
    </SimpleGrid>
  )
}

export default NoteList;