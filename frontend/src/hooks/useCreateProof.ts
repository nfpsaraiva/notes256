import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, ContractTransactionReceipt } from "ethers";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import envs from "@/envs";

interface Proof {
  name: string,
  description: string
}

const useCreateProof = () => {
  const queryClient = useQueryClient()
  const { walletProvider } = useWeb3ModalProvider();
  const { CONTRACT_ADDRESS, PROOF_TOKKEN_URI } = envs;

  const {
    mutate: createProof,
    isSuccess: proofCreated
  } = useMutation({
    mutationFn: async ({ name, description }: Proof) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner();

      const provifyContract = new Contract(CONTRACT_ADDRESS, contract.abi, signer);

      const response = await provifyContract.createProof(name, description, PROOF_TOKKEN_URI);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["proofs"]})
  });

  return {
    createProof,
    proofCreated
  };
}

export default useCreateProof;