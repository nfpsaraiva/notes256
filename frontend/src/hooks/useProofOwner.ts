import { useAlchemy } from "@/contexts";
import { Proof } from "@/types";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";
import { Contract } from "alchemy-sdk";
import envs from "@/envs";
import { useQuery } from "@tanstack/react-query";

const useProofOwner = (proof: Proof) => {
  const alchemy = useAlchemy();
  const { CONTRACT_ADDRESS } = envs;

  const {data: owner} = useQuery({
    queryKey: ["proof", "owner", proof.id],
    queryFn: async () => {
      const alchemyProvider = await alchemy.config.getProvider();
    
      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      );
    
      return await provifyContract.ownerOf(Number(proof.tokenId));
    }
  })

  return { owner };
}

export default useProofOwner;