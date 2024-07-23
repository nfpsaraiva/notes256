import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import envs from "@/envs";

const useVerifyProof = (address: string, proofId: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: isOwner, isLoading, refetch } = useQuery({
    queryKey: ['proofs', 'verify', address, proofId],
    queryFn: async () => {
      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      );

      const proofInternalId = await provifyContract.proofsIdsByContentHash(proofId);

      const owner = await provifyContract.ownerOf(Number(proofInternalId));

      return address === owner;
    },
    enabled: false
  });

  return { isOwner, isLoading, refetch }
}

export default useVerifyProof;