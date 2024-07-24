import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract, Nft } from "alchemy-sdk";
import envs from "@/envs";
import { Proof } from "@/types";
import { buildProofByNFT } from "@/utils/proofUtils";

const useProofs = (searchTerm: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: proofs, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: ["proofs", searchTerm],
    queryFn: async () => {
      let provifyNfts = [];

      const { nfts } = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS);
      provifyNfts = nfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )

      const getProof = async (nft: Nft) => {
        let proof = null;

        try {
          proof = await buildProofByNFT(nft, provifyContract);
        } catch (e) {
          return undefined;
        }

        if (searchTerm === "") {
          return proof;
        }

        if (searchTerm.length === 66) {
          if (proof.id === searchTerm) {
            return proof
          }

          return undefined;
        }

        if (searchTerm.length === 42) {
          if (proof.owner === searchTerm) {
            return proof;
          }

          return undefined;
        }

        if (proof.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return proof;
        }

        if (proof.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return proof;
        }
      }

      const promises = provifyNfts.map(nft=> getProof(nft))
      const proofs = await Promise.all(promises)

      return proofs.filter(p => p !== undefined).sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) return 1;
        if (a.date.getTime() > b.date.getTime()) return -1;
        return 0
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { proofs, isSuccess, isFetching, isError, refetch };
}

export default useProofs;