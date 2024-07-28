import { useLocalStorage } from "@mantine/hooks";
import { LocalNote } from "@/types";

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
      image: "",
      tokenId: 0
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

  return { 
    localNotes: notes, 
    createLocalNote: createNote,
    updateLocalNote: updateNote,
    deleteLocalNote: deleteNote
  }
}

export default useLocalNotes;