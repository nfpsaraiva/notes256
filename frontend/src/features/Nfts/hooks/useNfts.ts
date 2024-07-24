import { useAlchemy } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import contract from "../../../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { Contract, Nft as AlchemyNft} from "alchemy-sdk";
import envs from "@/envs";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { buildNftByNFT } from "../utils/nftUtils";

const useNfts = (searchTerm: string) => {
  const alchemy = useAlchemy();
  const { address } = useWeb3ModalAccount();

  const { CONTRACT_ADDRESS } = envs;

  const { data: nfts, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: ["nfts", address, searchTerm],
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

      const getNft = async (alchemyNft: AlchemyNft) => {
        let nft = null;

        try {
          nft = await buildNftByNFT(alchemyNft, provifyContract);
        } catch(e) {
          return undefined;
        }

        if (searchTerm === "") {
          return nft
        }

        if (searchTerm.length === 66) {
          if (nft.id === searchTerm) {
            return nft;
          }

          return undefined;
        }

        if (nft.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return nft;
        }

        if (nft.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return nft;
        }
      }

      const promises = contractNfts.map(nft => getNft(nft));
      const nfts = await Promise.all(promises);

      return nfts.filter(p => p !== undefined).sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) return 1;
        if (a.date.getTime() > b.date.getTime()) return -1;
        return 0
      });
    },
    enabled: address !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  return { nfts, isSuccess, isFetching, isError, refetch };
}

export default useNfts;