import { Note } from "@/types"

const getNotesFiltered = (notes: Note[], searchTerm: string) => {
  return notes.filter(note => {
    if (searchTerm === "") return true;
    if (note.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (note.description.toLowerCase().includes(searchTerm.toLowerCase())) return true;

    return false;
  })
}

export {
  getNotesFiltered
}