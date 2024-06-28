import { Alchemy, Network } from "alchemy-sdk";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(config);

const useVerifyProof = () => {

  const verifyProof = async (proofId: number) => {

    const tokenMetadata = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, proofId);

    console.log(tokenMetadata);
  }

  return { verifyProof };
}

export default useVerifyProof;