import { StatusEnum } from "@/features/Notes/enums";

interface Note {
  id: string,
  name: string,
  description: string,
  date: Date,
  status: StatusEnum
}

export default Note;