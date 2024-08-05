import { useUserbase } from "@/contexts";
import { NoteType, Path } from "@/enums";
import { Note, WebNote } from "@/types";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

const useWebNotes = () => {
  const {
    user,
    notes,
    isLoading,
    refetch,
    createNote: userbaseCreateNote,
    creatingNote,
    updateNote: userbaseUpdateNote,
    deleteNote: userbaseDeleteNote,
  } = useUserbase();

  const navigate = useNavigate();

  const createNote = async (name: string, description: string) => {
    userbaseCreateNote({
      id: Date.now().toString(),
      name,
      description,
      date: new Date(),
      type: NoteType.WEB
    });

    navigate(Path.WEB_NOTES);
  }

  const updateNote = async (note: WebNote) => {
    await userbaseUpdateNote(note);
    navigate(Path.WEB_NOTES);
  }

  const deleteNote = async (note: WebNote) => {
    modals.openConfirmModal({
      title: 'Delete Note',
      centered: true,
      children: "Are you sure you want to delete this note? This action is irreversible",
      labels: { confirm: 'Delete', cancel: "Cancel" },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        userbaseDeleteNote(note);
        navigate(Path.WEB_NOTES);
      }
    });
  }

  const transferNote = async (note: Note, to: string) => { }

  const convertToLocal = async (
    note: Note,
    createLocalNote: (name: string, description: string) => Promise<void>
  ) => {
    await createLocalNote(note.name, note.description);
    await deleteNote(note);
    navigate(Path.LOCAL_NOTES);
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (name: string, description: string) => Promise<void>
  ) => {
    await createBlockNote(note.name, note.description);
    await deleteNote(note);
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