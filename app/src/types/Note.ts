import { Status } from "@/features/Notes/enums";

interface Note {
  id: string,
  name: string,
  description: string,
  date: Date,
  status: Status
}

export default Note;