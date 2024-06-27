import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, ContractTransactionReceipt, ethers } from "ethers";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useVerifyProof = () => {

  const { walletProvider } = useWeb3ModalProvider();

  const verifyProof = async (proofId: number) => {

    const provider = new ethers.JsonRpcProvider();

    const provifyContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, provider);

    provifyContract.ad

    const owner = await provifyContract.ownerOf();

    console.log(owner)
  }

  return { verifyProof };
}

export default useVerifyProof;