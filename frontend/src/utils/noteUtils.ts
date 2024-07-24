import { Contract, Nft } from "alchemy-sdk";

const buildNoteByNFT = async (nft: Nft, contract: Contract) => {
  const [note, owner] = await Promise.all([
    contract.notes(BigInt(nft.tokenId)),
    contract.ownerOf(nft.tokenId)
  ]);

  const metadata = await fetch(nft.raw.tokenUri as string);
  const { image } = await metadata.json();

  const timestamp = Number(note[3]);
  const date = new Date(timestamp * 1000);

  return {
    id: note[0] as string,
    name: note[1] as string,
    description: note[2] as string,
    tokenId: Number(nft.tokenId),
    image: image as string,
    date,
    owner
  }
};

const shortifyAddress = (address: string) => {
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);

  return `${start}...${end}`;
}

export {
  buildNoteByNFT,
  shortifyAddress
}