import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import contractArtifact from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import envs from "@/envs";

interface Proof {
  name: string,
  description: string
}

const useCreateProof = () => {
  const queryClient = useQueryClient()
  const { walletProvider } = useWeb3ModalProvider();
  const { CONTRACT_ADDRESS, PROOF_TOKEN_URI } = envs;

  const {
    mutate: createProof,
    isSuccess: proofCreated,
    isPending: creatingProof
  } = useMutation({
    mutationFn: async ({ name, description }: Proof) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
      
      const response = await contract.createProof(name, description, PROOF_TOKEN_URI);

      console.log(response);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["proofs"]})
  });

  return {
    createProof,
    creatingProof,
    proofCreated
  };
}

export default useCreateProof;