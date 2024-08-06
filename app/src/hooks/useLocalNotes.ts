import { useLocalStorage } from "@mantine/hooks";
import { LocalNote, Note } from "@/types";
import { NoteType, Path } from "@/enums";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteModal } from "@/modals";
import NewNote from "@/types/NewNote";

const useLocalNotes = () => {
  const [notes, setNotes] = useLocalStorage<LocalNote[]>({
    key: "Notes256",
    defaultValue: []
  });
  const navigate = useNavigate();

  const [creatingNote, setCreatingNote] = useState(false);

  const createNote = async ({ name, description }: NewNote) => {
    // await to force state update on the useEffect for creatingNote on CreateNoteForm
    await setCreatingNote(true);

    const newNote: LocalNote = {
      id: `Notes256-${Date.now()}`,
      name,
      description,
      date: new Date(),
      type: NoteType.LOCAL
    };

    setNotes([...notes, newNote]);
    setCreatingNote(false);

    navigate(Path.LOCAL_NOTES);
  }

  const updateNote = async (note: LocalNote) => {
    const newNotes = notes.filter(n => n.id !== note.id);

    setNotes([...newNotes, {
      ...note,
      date: new Date(),
    }]);

    navigate(Path.LOCAL_NOTES);
  }

  const deleteLocalStorageNote = async (note: LocalNote) => {
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
  }

  const deleteNote = async (note: LocalNote) => {
    DeleteModal(() => deleteLocalStorageNote(note))
  }

  const transferNote = async (note: Note, to: string) => { }

  const convertToWeb = async (
    note: Note,
    createWebNote: (note: NewNote) => void
  ) => {
    await createWebNote({ name: note.name, description: note.description });
    deleteLocalStorageNote(note);
    navigate(Path.WEB_NOTES);
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (note: NewNote) => void
  ) => {
    await createBlockNote({ name: note.name, description: note.description });
    deleteLocalStorageNote(note);
    navigate(Path.BLOCK_NOTES);
  }

  const refetch = () => { };

  return {
    isConnected: true,
    localNotes: notes,
    refetch,
    createNote,
    creatingNote,
    updateNote,
    deleteNote,
    transferNote,
    convertToBlock,
    convertToWeb
  }
}

export default useLocalNotes;