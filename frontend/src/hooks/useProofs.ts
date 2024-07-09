import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import envs from "@/envs";
import { Proof } from "@/types";

const useProofs = (owner: string | undefined) => {
  const alchemy = useAlchemy();
  const { isConnected } = useWeb3ModalAccount();
  const { CONTRACT_ADDRESS } = envs;

  const { data: proofs, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["proofs", owner],
    queryFn: async () => {
      if (owner === undefined) return [];

      const { ownedNfts } = await alchemy.nft.getNftsForOwner(owner);

      const provifyOwnedNfts = ownedNfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )

      const proofs: Proof[] = [];
      for (const nft of provifyOwnedNfts) {
        const proof = await provifyContract.proofs(nft.tokenId);
        const tokenURI = await provifyContract.tokenURI(nft.tokenId);
        const metadata = await fetch(tokenURI);
        const {image} = await metadata.json();

        const timestamp = Number(proof[3]);
        const date = new Date(timestamp * 1000);

        proofs.push({
          id: nft.tokenId,
          name: proof[0],
          description: proof[1],
          image,
          date
        });
      }

      return proofs.sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) return 1;
        if (a.date.getTime() > b.date.getTime()) return -1;
        return 0
      });
    },
    enabled: isConnected
  });

  return { proofs, isSuccess, isLoading, isError };
}

export default useProofs;