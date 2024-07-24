import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import envs from "@/envs";
import contractArtifact from "../../../../../artifacts/contracts/Notes256.sol/Notes256.json";

const useDeleteNft = () => {
  const queryClient = useQueryClient();
  const { walletProvider } = useWeb3ModalProvider();
  const { CONTRACT_ADDRESS } = envs;

  const {
    mutate: deleteNft,
    isSuccess: nftDeleted,
    isPending: deletingNft
  } = useMutation({
    mutationFn: async (tokenId: number) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.burn(tokenId);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["nfts"] })
  });

  return {
    deleteNft,
    nftDeleted,
    deletingNft
  }
}

export default useDeleteNft;