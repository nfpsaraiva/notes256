import { Contract, Nft as AlchemyNft } from "alchemy-sdk";

const buildNftByNFT = async (alchemyNft: AlchemyNft, contract: Contract) => {
  const [nft, owner] = await Promise.all([
    contract.notes(BigInt(alchemyNft.tokenId)),
    contract.ownerOf(alchemyNft.tokenId)
  ]);
  console.log(nft);

  const metadata = await fetch(alchemyNft.raw.tokenUri as string);
  const { image } = await metadata.json();

  const timestamp = Number(nft[3]);
  const date = new Date(timestamp * 1000);

  return {
    id: nft[0] as string,
    name: nft[1] as string,
    description: nft[2] as string,
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
  buildNftByNFT,
  shortifyAddress
}