interface Nft {
  id: string,
  name: string,
  description: string,
  date: Date,
  tokenId: number,
  image: string,
  owner: string
}

export default Nft;