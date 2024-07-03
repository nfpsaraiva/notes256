import { useAlchemy, useContractAddress } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { Contract, ethers } from "ethers";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";

const useProofs = (owner: string | undefined) => {
  const alchemy = useAlchemy();
  const contractAddress = useContractAddress();

  const { data: proofs, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["proofs", contractAddress],
    queryFn: async () => {
      if (owner === undefined) return [];

      const { ownedNfts } = await alchemy.nft.getNftsForOwner(owner);

      const provider = new ethers.AlchemyProvider()

      for (const nfts of ownedNfts) {
        const provifyContract = new Contract(contractAddress, contract.abi, provider);

        const proofs = await provifyContract.proofs(1);

        console.log(proofs);
      }

      return ownedNfts.filter(nft => nft.contract.address === contractAddress);
    }
  });

  return { proofs, isSuccess, isFetching, isError };
}

export default useProofs;