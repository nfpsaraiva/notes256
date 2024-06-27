import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, ContractTransactionReceipt } from "ethers";
import contract from "./../../../artifacts/contracts/Provify.sol/Provify.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useCreateProof = () => {
    const { walletProvider } = useWeb3ModalProvider();

    const createProof = async (name: string, description: string) => {
        if (!walletProvider) return;

        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner();

        const provifyContract = new Contract(CONTRACT_ADDRESS, contract.abi, signer);

        const response = await provifyContract.createProof(name, description);

        const txReceipt: ContractTransactionReceipt = await response.wait();

        const logsDescriptions = txReceipt.logs.map(log => {
            return provifyContract.interface.parseLog(log);
        });

        const proofCreated = logsDescriptions.find(log => log?.name === "ProofCreated");

        if (!proofCreated) return 0;

        return Number(proofCreated.args[0]);
    }

    return { createProof }
}

export default useCreateProof;