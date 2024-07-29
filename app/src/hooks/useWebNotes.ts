import { useUserbase } from "@/contexts";
import { NoteType } from "@/enums";
import { Note } from "@/types";
import useLocalNotes from "./useLocalNotes";

const useWebNotes = () => {
  const { notes, isLoading, createNote: userbaseCreateNote, updateNote, deleteNote } = useUserbase();

  const createNote = async (name: string, description: string) => {
    userbaseCreateNote({
      id: Date.now().toString(),
      name,
      description,
      date: new Date(),
      editable: true,
      type: NoteType.WEB
    })
  }

  const transferNote = async (note: Note, to: string) => { }

  const convertToLocal = async (
    note: Note,
    createLocalNote: (name: string, description: string) => Promise<void>
  ) => {
    await createLocalNote(note.name, note.description);
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (name: string, description: string) => Promise<void>
  ) => {
    await createBlockNote(note.name, note.description);
  }

  return {
    webNotes: notes,
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    transferNote,
    convertToBlock,
    convertToLocal
  }
}

export default useWebNotes;