import { useLocalStorage } from "@mantine/hooks";
import { LocalNote, Note } from "@/types";
import { NoteType, Path } from "@/enums";
import { useNavigate } from "react-router-dom";

const useLocalNotes = () => {
  const [notes, setNotes] = useLocalStorage<LocalNote[]>({
    key: "Notes256",
    defaultValue: []
  });
  const navigate = useNavigate();

  const createNote = async (name: string, description: string) => {
    const newNote: LocalNote = {
      id: `Notes256-${Date.now()}`,
      name,
      description,
      date: new Date(),
      type: NoteType.LOCAL
    };

    setNotes([...notes, newNote]);

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

  const deleteNote = async (note: LocalNote) => {
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    navigate(Path.LOCAL_NOTES);
  }

  const transferNote = async (note: Note, to: string) => {}

  const convertToWeb = async (
    note: Note,
    createWebNote: (name: string, description: string) => Promise<void>
  ) => {
    await createWebNote(note.name, note.description);
    await deleteNote(note);
    navigate(Path.WEB_NOTES);
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
    isConnected: true,
    localNotes: notes, 
    createNote,
    updateNote,
    deleteNote,
    transferNote,
    convertToBlock,
    convertToWeb
  }
}

export default useLocalNotes;