import { Contract } from "alchemy-sdk";

const buildProofByTokenId = async (tokenId: number, contract: Contract) => {
  const proof = await contract.proofs(tokenId);
  const tokenURI: string = await contract.tokenURI(tokenId);
  const metadata = await fetch(tokenURI);
  const { image } = await metadata.json();

  const timestamp = Number(proof[3]);
  const date = new Date(timestamp * 1000);

  return {
    id: proof[0] as string,
    name: proof[1] as string,
    description: proof[2] as string,
    tokenId: tokenId,
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
  buildProofByTokenId,
  shortifyAddress
}