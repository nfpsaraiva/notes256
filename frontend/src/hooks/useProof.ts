import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import envs from "@/envs";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import { buildProofByNFT } from "@/utils/proofUtils";

const useProof = (proofId: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: proof, isLoading, isError, refetch } = useQuery({
    queryKey: ['proof', proofId],
    queryFn: async () => {
      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      );

      const tokenId = await provifyContract.proofsIdsByContentHash(proofId);
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);

      return await buildProofByNFT(nft, provifyContract);
    },
    enabled: false
  })

  return { proof, isLoading, isError, refetch };
}

export default useProof;