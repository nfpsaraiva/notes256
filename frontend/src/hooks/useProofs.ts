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

      const provider = new ethers.AlchemyProvider(
        import.meta.env.VITE_NETWORK_NAME,
        import.meta.env.VITE_ALCHEMY_API_KEY
      )

      const provifyContract = new Contract(contractAddress, contract.abi, provider);

      const provifyOwnedNfts = ownedNfts.filter(nft => nft.contract.address === contractAddress);

      const proofs = [];
      for (const nft of provifyOwnedNfts) {
        const proof = await provifyContract.proofs(nft.tokenId);

        proofs.push({
          id: nft.tokenId,
          name: proof[0],
          description: proof[1]
        });
      }

      return proofs;
    },
  });

  return { proofs, isSuccess, isFetching, isError };
}

export default useProofs;