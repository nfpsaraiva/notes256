import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import contractArtifact from "../../../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import envs from "@/envs";

interface Nft {
  name: string,
  description: string
}

const useCreateNft = () => {
  const queryClient = useQueryClient()
  const { walletProvider } = useWeb3ModalProvider();
  const { CONTRACT_ADDRESS, PROOF_TOKEN_URI } = envs;

  const {
    mutate: createNft,
    isSuccess: nftCreated,
    isPending: creatingNft
  } = useMutation({
    mutationFn: async ({ name, description }: Nft) => {
      if (!walletProvider) return;
      
      const ethersProvider = new BrowserProvider(walletProvider);
      
      const signer = await ethersProvider.getSigner();
      
      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
      
      const response = await contract.createNote(name, description, PROOF_TOKEN_URI);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["nfts"]})
  });

  return {
    createNft,
    creatingNft,
    nftCreated
  };
}

export default useCreateNft;