import { useLocalStorage } from "@mantine/hooks";
import { LocalNote, Note } from "@/types";

const useLocalNotes = () => {
  const [notes, setNotes] = useLocalStorage<LocalNote[]>({
    key: "Notes256",
    defaultValue: []
  });

  const createNote = async (name: string, description: string) => {
    setNotes([...notes, {
      id: `Notes256-${Date.now()}`,
      name,
      description,
      date: new Date(),
      editable: true
    }]);
  }

  const updateNote = async (note: LocalNote) => {
    const newNotes = notes.filter(n => n.id !== note.id);

    setNotes([...newNotes, {
      ...note,
      date: new Date(),
    }]);
  }

  const deleteNote = async (note: LocalNote) => {
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes)
  }

  const transferNote = async (note: Note, to: string) => {}

  return { 
    localNotes: notes, 
    createNote,
    updateNote,
    deleteNote,
    transferNote
  }
}

export default useLocalNotes;