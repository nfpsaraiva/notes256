import { BlockNote, LocalNote, WebNote } from "@/types";

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

const shortifyAddress = (address: string) => {
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);

  return `${start}...${end}`;
}

export {
  filterNotes,
  shortifyAddress
}