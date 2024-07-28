import { useUserbase } from "@/contexts";

const useWebNotes = () => {
  const { notes, isLoading, createNote: userbaseCreateNote, updateNote, deleteNote } = useUserbase();

  const createNote = async (name: string, description: string) => {
    userbaseCreateNote({
      id: Date.now().toString(),
      name,
      description,
      date: new Date(),
      image: "",
      tokenId: 0
    })
  }

  return { 
    webNotes: notes, 
    isLoading,
    createWebNote: createNote,
    updateWebNote: updateNote,
    deleteWebNote: deleteNote
  }
}

export default useWebNotes;