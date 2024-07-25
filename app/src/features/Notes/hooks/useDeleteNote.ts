import { useLocalStorage } from "@mantine/hooks";
import { Note } from "@/types";

const useDeleteNote = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>({
    key: "notes256-notes",
    defaultValue: []
  });

  const deleteNote = (note: Note) => {
    const newNotes = notes.filter(n => n.id !== note.id);

    setNotes(newNotes);
  }

  return { deleteNote }
}

export default useDeleteNote;