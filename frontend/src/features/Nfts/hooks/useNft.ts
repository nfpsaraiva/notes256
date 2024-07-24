import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import envs from "@/envs";
import contract from "../../../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { Contract } from "alchemy-sdk";
import { buildNftByNFT } from "../utils/nftUtils";

const useNft = (nftId: string) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const { data: nft, isLoading, isError, refetch } = useQuery({
    queryKey: ['nft', nftId],
    queryFn: async () => {
      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      );

      const tokenId = await provifyContract.nftsIdsByContentHash(nftId);
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);

      return await buildNftByNFT(nft, provifyContract);
    },
    enabled: false
  })

  return { nft, isLoading, isError, refetch };
}

export default useNft;