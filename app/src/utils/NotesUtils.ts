import { BlockNote, LocalNote, Note, WebNote } from "@/types";

const filterNotes = (notes: LocalNote[] | WebNote[] | BlockNote[], searchTerm: string) => {
  const notesFiltered = notes.filter(note => {
    if (searchTerm === undefined || searchTerm === "") return true;
    if (note.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (note.description.toLowerCase().includes(searchTerm.toLowerCase())) return true;

    return false;
  })

  notesFiltered.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    if (aDate.getTime() < bDate.getTime()) return 1;
    if (aDate.getTime() > bDate.getTime()) return -1;
    return 0
  });

  return notesFiltered;
}

const isNoteValid = (note: Note) => {
  if (note.name.length > 50) return false;
  if (note.description.length > 256) return false;
}

const shortifyAddress = (address: string) => {
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);

  return `${start}...${end}`;
}

export {
  filterNotes,
  isNoteValid,
  shortifyAddress,
}