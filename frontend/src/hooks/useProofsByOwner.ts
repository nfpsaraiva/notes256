import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import envs from "@/envs";
import { Proof } from "@/types";
import { buildProofByTokenId } from "@/utils/proofUtils";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useProofsByOwner = (searchTerm: string) => {
  const alchemy = useAlchemy();
  const { address } = useWeb3ModalAccount();

  const { CONTRACT_ADDRESS } = envs;

  const { data: proofs, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: ["proofs", address, searchTerm],
    queryFn: async () => {
      if (address === undefined) return [];
      
      const proofs: Proof[] = [];
      let provifyNfts = [];

      const { ownedNfts } = await alchemy.nft.getNftsForOwner(address);
      provifyNfts = ownedNfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )

      for (const nft of provifyNfts) {
        const proof = await buildProofByTokenId(Number(nft.tokenId), provifyContract);

        if (searchTerm === "") {
          proofs.push(proof);
          continue;
        }

        if (searchTerm.length === 66) {
          if (proof.id === searchTerm) {
            proofs.push(proof);
          }

          continue;
        }

        if (searchTerm.length === 42) {
          if (address === searchTerm) {
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
    enabled: address !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  return { proofs, isSuccess, isFetching, isError, refetch };
}

export default useProofsByOwner;