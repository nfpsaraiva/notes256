import Note from "./Note";

interface BlockNote extends Note {
  tokenId: number,
  image: string,
  editable: boolean
}

export default BlockNote;