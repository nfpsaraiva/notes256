interface Proof {
  id: string,
  name: string,
  description: string,
  date: Date,
  tokenId: bigint,
  image: string,
  issuer: string
}

export default Proof;