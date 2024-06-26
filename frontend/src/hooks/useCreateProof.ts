import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import contract from "./../../../artifacts/contracts/Provify.sol/Provify.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useCreateProof = (name: string, description: string) => {
    const { walletProvider } = useWeb3ModalProvider();

    const createProof = async () => {
        if (!walletProvider) return;

        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner();

        const provifyContract = new Contract(CONTRACT_ADDRESS, contract.abi, signer);

        await provifyContract.createProof(name, description);
    }

    return { createProof }
}

export default useCreateProof;