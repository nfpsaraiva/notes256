import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import envs from "@/envs";
import { Proof } from "@/types";
import { buildProofByTokenId } from "@/utils/proofUtils";

const useProofs = (searchTerm: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: proofs, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: ["proofs", searchTerm],
    queryFn: async () => {
      const proofs: Proof[] = [];
      let provifyNfts = [];

      const { nfts } = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS);
      provifyNfts = nfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )


      for (const nft of provifyNfts) {
        const proof = await buildProofByTokenId(Number(nft.tokenId), provifyContract);
        const owner = await provifyContract.ownerOf(nft.tokenId);

        if (searchTerm.length === 66) {
          if (proof.id === searchTerm) {
            proofs.push(proof);
          }

          continue;
        }

        if (searchTerm.length === 42) {
          if (owner === searchTerm) {
            proofs.push(proof);
          }

          continue;
        }

        if (proof.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          proofs.push(proof);
          continue;
        }

        if (proof.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          proofs.push(proof);
          continue;
        }
      }

      return proofs.sort((a, b) => {
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