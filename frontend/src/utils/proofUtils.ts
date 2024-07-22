import { Contract } from "alchemy-sdk";

const buildProofByTokenId = async (tokenId: number, contract: Contract) => {
  const proof = await contract.proofs(tokenId);
  const tokenURI: string = await contract.tokenURI(tokenId);
  const metadata = await fetch(tokenURI);
  const { image } = await metadata.json();

  const timestamp = Number(proof[4]);
  const date = new Date(timestamp * 1000);

  return {
    id: proof[0],
    name: proof[1],
    description: proof[2],
    tokenId: BigInt(tokenId),
    image,
    date,
    issuer: proof[3]
  }
};

export {
  buildProofByTokenId
}