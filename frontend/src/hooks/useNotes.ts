import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { Contract, Nft } from "alchemy-sdk";
import envs from "@/envs";
import { buildNoteByNFT } from "@/utils/noteUtils";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useNotesByOwner = (searchTerm: string) => {
  const alchemy = useAlchemy();
  const { address } = useWeb3ModalAccount();

  const { CONTRACT_ADDRESS } = envs;

  const { data: notes, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: ["notes", address, searchTerm],
    queryFn: async () => {
      if (address === undefined) return [];
      
      let contractNfts = [];

      const { ownedNfts } = await alchemy.nft.getNftsForOwner(address);
      contractNfts = ownedNfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )

      const getNote = async (nft: Nft) => {
        let note = null;

        try {
          note = await buildNoteByNFT(nft, provifyContract);
        } catch(e) {
          return undefined;
        }

        if (searchTerm === "") {
          return note
        }

        if (searchTerm.length === 66) {
          if (note.id === searchTerm) {
            return note;
          }

          return undefined;
        }

        if (searchTerm.length === 42) {
          if (address === searchTerm) {
            return note;
          }

          return undefined;
        }

        if (note.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return note;
        }

        if (note.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return note;
        }
      }

      const promises = contractNfts.map(nft => getNote(nft));
      const notes = await Promise.all(promises);

      return notes.filter(p => p !== undefined).sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) return 1;
        if (a.date.getTime() > b.date.getTime()) return -1;
        return 0
      });
    },
    enabled: address !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  return { notes, isSuccess, isFetching, isError, refetch };
}

export default useNotesByOwner;