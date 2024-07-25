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
      status: Status[status],
      date: new Date()
    }]);
  }

  const archiveNote = () => updateNoteStatus(note, Status.ARCHIVED);
  const activateNote = () => updateNoteStatus(note, Status.ACTIVE);
  const deleteNote = () => updateNoteStatus(note, Status.TRASHED);

  return {
    archiveNote,
    activateNote,
    deleteNote
  }
}

export default useNote;