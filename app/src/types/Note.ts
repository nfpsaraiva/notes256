import { NoteType } from "@/enums";

interface Note {
  id: string,
  type: NoteType,
  name: string,
  description: string,
  date: Date,
}

export default Note;