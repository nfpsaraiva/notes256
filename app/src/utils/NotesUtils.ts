import { BlockNote, LocalNote, WebNote } from "@/types";
import { Contract, Nft } from "alchemy-sdk";

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

const buildBlockNoteByNFT = async (nft: Nft, contract: Contract) => {
  const blockNote = await contract.notes(BigInt(nft.tokenId));
  const metadata = await fetch(nft.raw.tokenUri as string);
  const { image } = await metadata.json();

  const timestamp = Number(blockNote[3]);
  const date = new Date(timestamp * 1000);

  return {
    id: blockNote[0] as string,
    name: blockNote[1] as string,
    description: blockNote[2] as string,
    tokenId: Number(nft.tokenId),
    image: image as string,
    date,
  }
};

const shortifyAddress = (address: string) => {
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);

  return `${start}...${end}`;
}

export {
  filterNotes,
  buildBlockNoteByNFT,
  shortifyAddress
}