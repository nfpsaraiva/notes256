import { useLocalStorage } from "@mantine/hooks";
import { Note } from "@/types";
import { Status } from "../enums";

const useNotes = (searchTerm?: string) => {
  const [notes] = useLocalStorage<Note[]>({
    key: "notes256-notes",
    defaultValue: []
  });

  const notesFIltered = notes.filter(note => {
    if (searchTerm === undefined || searchTerm === "") return true;
    if (note.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (note.description.toLowerCase().includes(searchTerm.toLowerCase())) return true;

    return false;
  })

  notesFIltered.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    if (aDate.getTime() < bDate.getTime()) return 1;
    if (aDate.getTime() > bDate.getTime()) return -1;
    return 0
  });

  return { notes: notesFIltered};
}

export default useNotes;