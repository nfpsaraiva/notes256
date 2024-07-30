import Note from "./Note";

interface BlockNote extends Note {
  tokenId: number,
  image: string,
}

export default BlockNote;