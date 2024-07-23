import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import envs from "@/envs";
import { Proof } from "@/types";
import { buildProofByTokenId } from "@/utils/proofUtils";

const useProofs = (owner?: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: proofs, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["proofs"],
    queryFn: async () => {
      const proofs: Proof[] = [];
      let provifyNfts = [];

      if (owner === undefined) {
        const { nfts } = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS);
        provifyNfts = nfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);
      } else {
        console.log("owner");
        const { ownedNfts } = await alchemy.nft.getNftsForOwner(owner);
        provifyNfts = ownedNfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);
      }

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )
      
      for (const nft of provifyNfts) {
        const proof = await buildProofByTokenId(Number(nft.tokenId), provifyContract);

        proofs.push(proof);
      }

      return proofs.sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) return 1;
        if (a.date.getTime() > b.date.getTime()) return -1;
        return 0
      });
    }
  });

  return { proofs, isSuccess, isFetching, isError };
}

export default useProofs;