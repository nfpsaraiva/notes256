import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, ContractTransactionReceipt } from "ethers";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useVerifyProof = () => {
  const { walletProvider } = useWeb3ModalProvider();

  const verifyProof = async (proofId: number) => {

    if (!walletProvider) return;

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    const provifyContract = new Contract(CONTRACT_ADDRESS, contract.abi, signer);

    const response = await provifyContract.verifyProof(proofId);

    const txReceipt: ContractTransactionReceipt = await response.wait();

    const logsDescriptions = txReceipt.logs.map(log => {
      return provifyContract.interface.parseLog(log);
    });

    const proofDetails = logsDescriptions.find(log => log?.name === "ProofDetails");

    if (!proofDetails) return 0;

    console.log(proofDetails.args);

    return proofDetails.args;
  }

  return { verifyProof };
}

export default useVerifyProof;