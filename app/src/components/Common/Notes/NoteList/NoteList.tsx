import { Note } from "@/types";
import { List } from "@mantine/core";
import { FC } from "react";

interface NoteListProps {
  notes: Note[]
}

const NoteList: FC<NoteListProps> = ({ notes }: NoteListProps) => {
  return (
    <List>
      {
        notes.map(note => {
          return (
            <List.Item key={note.id}>
              {note.name}
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default NoteList;