import { useSupabase } from "@/contexts";
import { Path } from "@/enums";
import { DeleteModal } from "@/modals";
import { Note, WebNote } from "@/types";
import { useNavigate } from "react-router-dom";

const useWebNotes = () => {
  const {
    user,
    notes,
    isLoading,
    refetch,
    createNote: supabaseCreateNote,
    creatingNote,
    updateNote: supabaseUpdateNote,
    deleteNote: supabaseDeleteNote,
  } = useSupabase();

  const navigate = useNavigate();

  const createNote = async (name: string, description: string) => {
    supabaseCreateNote(name, description);

    navigate(Path.WEB_NOTES);
  }

  const updateNote = async (note: WebNote) => {
    await supabaseUpdateNote(note);
    navigate(Path.WEB_NOTES);
  }

  const deleteNote = async (note: WebNote) => {
    DeleteModal(() => {
      supabaseDeleteNote(note);
      navigate(Path.WEB_NOTES);
    })
  }

  const transferNote = async (note: Note, to: string) => { }

  const convertToLocal = async (
    note: Note,
    createLocalNote: (name: string, description: string) => Promise<void>
  ) => {
    await createLocalNote(note.name, note.description);
    await supabaseDeleteNote(note);
    navigate(Path.LOCAL_NOTES);
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (name: string, description: string) => Promise<void>
  ) => {
    await createBlockNote(note.name, note.description);
    await supabaseDeleteNote(note);
    navigate(Path.BLOCK_NOTES);
  }

  return {
    isConnected: user !== null,
    webNotes: notes,
    isLoading,
    refetch,
    createNote,
    creatingNote,
    updateNote,
    deleteNote,
    transferNote,
    convertToBlock,
    convertToLocal
  }
}

export default useWebNotes;