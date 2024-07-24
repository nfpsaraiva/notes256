import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import envs from "@/envs";
import { BrowserProvider, Contract } from "ethers";
import contractArtifact from "../../../../../artifacts/contracts/Notes256.sol/Notes256.json";

const useTransferNft = () => {
  const queryClient = useQueryClient();
  const { walletProvider } = useWeb3ModalProvider();
  const { address: from } = useWeb3ModalAccount();
  const { CONTRACT_ADDRESS } = envs;

  const {
    mutate: transferNft,
    isSuccess: nftTransfered,
    isPending: transferingNft
  } = useMutation({
    mutationFn: async ({ to, tokenId }: {to: string, tokenId: number}) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.safeTransferFrom(from, to, tokenId);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["nfts"] })
  });

  return {
    transferNft,
    nftTransfered,
    transferingNft
  }
}

export default useTransferNft;