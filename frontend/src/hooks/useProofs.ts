import { useAlchemy, useContractAddress } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useProofs = (owner: string | undefined) => {
  const alchemy = useAlchemy();
  const contractAddress = useContractAddress();
  const { isConnected } = useWeb3ModalAccount();

  const { data: proofs, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["proofs", contractAddress],
    queryFn: async () => {
      if (owner === undefined) return [];

      const { ownedNfts } = await alchemy.nft.getNftsForOwner(owner);

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(contractAddress, contract.abi, alchemyProvider)

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
    enabled: isConnected
  });

  return { proofs, isSuccess, isFetching, isError };
}

export default useProofs;