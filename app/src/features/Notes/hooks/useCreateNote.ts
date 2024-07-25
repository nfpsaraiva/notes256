import { useLocalStorage } from "@mantine/hooks";
import { Note } from "@/types";
import { Status } from "../enums";

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
      date: new Date(),
      status: Status.ACTIVE.toString()
    }

    setNotes([...notes, note]);
  }

  return { createNote }
}

export default useCreateNote;