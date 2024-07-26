import { Note } from "@/types";
import { useLocalStorage } from "@mantine/hooks";
import { Status } from "../enums";

const useNote = (note: Note) => {
  const [notes, setNotes] = useLocalStorage<Note[]>({
    key: "notes256-notes",
    defaultValue: []
  });

  const updateNoteStatus = (note: Note, status: Status) => {
    const newNotes = notes.filter(n => n.id !== note.id);
  
    setNotes([...newNotes, {
      ...note,
      date: new Date()
    }]);
  }

  const archiveNote = () => updateNoteStatus(note, Status.ARCHIVED);
  const activateNote = () => updateNoteStatus(note, Status.ACTIVE);
  const deleteNote = () => updateNoteStatus(note, Status.TRASHED);

  const permaDeleteNote = () => {
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
  }

  const updateNote = (name: string, description: string) => {
    const newNotes = notes.filter(n => n.id !== note.id);

    const newNote: Note = {
      id: note.id,
      name,
      description,
      date: new Date(),
    }

    setNotes([...newNotes, newNote]);
  }

  return {
    archiveNote,
    activateNote,
    deleteNote,
    permaDeleteNote,
    updateNote
  }
}

export default useNote;