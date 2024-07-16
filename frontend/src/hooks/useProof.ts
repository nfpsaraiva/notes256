import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import envs from "@/envs";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";

const useProof = (proofId: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: proof, isLoading, isError } = useQuery({
    queryKey: ['proof', proofId],
    queryFn: async () => {

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      );

      // Get proof
      const proof = await provifyContract.proofs(proofId);
      if (proof === undefined) return null;
      
      // Get tokenId
      const tokenId: bigint = await provifyContract.proofIdToTokenId(proofId);
      const tokenURI: string = await provifyContract.tokenURI(tokenId);
      const metadata = await fetch(tokenURI);
      const { image } = await metadata.json();
      if (Number(tokenId) <= 0) return null;

      const timestamp = Number(proof[3]);
      const date = new Date(timestamp * 1000);
      
      return {
        id: proofId,
        name: proof[0],
        description: proof[1],
        tokenId,
        image,
        date,
        issuer: proof[2]
      }
    },
    enabled: proofId !== ""
  })

  return { proof, isLoading, isError };
}

export default useProof;