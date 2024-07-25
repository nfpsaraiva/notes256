import { useLocalStorage } from "@mantine/hooks";
import { Note } from "@/types";
import { Status } from "../enums";

const useUpdateNote = (note: Note) => {
  const [notes, setNotes] = useLocalStorage<Note[]>({
    key: "notes256-notes",
    defaultValue: []
  });

  const updateNote = (name: string, description: string) => {

    const newNotes = notes.filter(n => n.id !== note.id);

    const newNote: Note = {
      id: note.id,
      name,
      description,
      date: new Date(),
      status: note.status
    }

    setNotes([...newNotes, newNote]);
  }

  return { updateNote }
}

export default useUpdateNote;