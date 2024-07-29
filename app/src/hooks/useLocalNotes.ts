import { useLocalStorage } from "@mantine/hooks";
import { LocalNote, Note, WebNote } from "@/types";
import { NoteType } from "@/enums";
import useWebNotes from "./useWebNotes";

const useLocalNotes = () => {
  const {createNote: createWebNote} = useWebNotes();

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
      editable: true,
      type: NoteType.LOCAL
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

  const convertToWeb = async (
    note: Note,
    createWebNote: (name: string, description: string) => Promise<void>
  ) => {
    await createWebNote(note.name, note.description);
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (name: string, description: string) => Promise<void>
  ) => {
    await createBlockNote(note.name, note.description);
  }

  return { 
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