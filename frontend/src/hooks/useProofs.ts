import { useAlchemy, useContractAddress } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useWalletInfo, useWeb3ModalAccount } from "@web3modal/ethers/react";

const useProofs = (owner: string|undefined) => {
  const alchemy = useAlchemy();
  const contractAddress = useContractAddress();

  

  const { data: proofs, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["proofs", contractAddress],
    queryFn: async () => {
      if (owner === undefined) return [];

      const {ownedNfts} = await alchemy.nft.getNftsForOwner(owner);

      return ownedNfts.filter(nft => nft.contract.address === contractAddress);

    }
  });

  return { proofs, isSuccess, isFetching, isError };
}

export default useProofs;