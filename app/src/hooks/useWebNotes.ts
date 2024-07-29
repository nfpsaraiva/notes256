import { useUserbase } from "@/contexts";
import { Note } from "@/types";

const useWebNotes = () => {
  const { notes, isLoading, createNote: userbaseCreateNote, updateNote, deleteNote } = useUserbase();

  const createNote = async (name: string, description: string) => {
    userbaseCreateNote({
      id: Date.now().toString(),
      name,
      description,
      date: new Date(),
      editable: true
    })
  }

  const transferNote = async (note: Note, to: string) => {}

  return { 
    webNotes: notes, 
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    transferNote
  }
}

export default useWebNotes;