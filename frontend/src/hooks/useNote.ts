import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import envs from "@/envs";
import contract from "../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { Contract } from "alchemy-sdk";
import { buildNoteByNFT } from "@/utils/noteUtils";

const useNote = (noteId: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: note, isLoading, isError, refetch } = useQuery({
    queryKey: ['note', noteId],
    queryFn: async () => {
      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      );

      const tokenId = await provifyContract.notesIdsByContentHash(noteId);
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);

      return await buildNoteByNFT(nft, provifyContract);
    },
    enabled: false
  })

  return { note, isLoading, isError, refetch };
}

export default useNote;