import { useLocalStorage } from "@mantine/hooks";
import { Note } from "@/types";

const useCreateNote = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>({
    key: "notes256-notes",
    defaultValue: []
  });

  const createNote = (name: string, description: string) => {
    const note: Note = {
      id: `notes256-note-${Date.now()}`,
      name,
      description,
      date: new Date()
    }

    setNotes([...notes, note]);
  }

  return { createNote }
}

export default useCreateNote;