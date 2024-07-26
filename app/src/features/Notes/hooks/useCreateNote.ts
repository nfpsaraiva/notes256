import { useLocalStorage } from "@mantine/hooks";
import { Note } from "@/types";
import { Status } from "../enums";
import { useUserbase } from "@/contexts";

const useCreateNote = () => {
  // const [notes, setNotes] = useLocalStorage<Note[]>({
  //   key: "notes256-notes",
  //   defaultValue: []
  // });
  const { createNote: userbaseCreateNote } = useUserbase();

  const createNote = async (name: string, description: string) => {
    const note: Note = {
      id: `notes256-note-${Date.now()}`,
      name,
      description,
      date: new Date(),
    }

    // setNotes([...notes, note]);

    await userbaseCreateNote(note);

  }

  return { createNote }
}

export default useCreateNote;