import { useAlchemy } from "@/contexts/AlchemyContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import envs from "@/envs";
import { Contract } from "alchemy-sdk";
import contract from "../../../artifacts/contracts/Provify.sol/Provify.json";

const useVerifyProof = (proofId: string) => {
  const alchemy = useAlchemy();
  const [address, setAddress] = useState<string | null>(null);
  const { CONTRACT_ADDRESS } = envs;

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["verify_proof", proofId],
    queryFn: async () => {
      if (isNaN(Number(proofId))) {
        setAddress(null);
        return false;
      }

      const alchemyProvider = await alchemy.config.getProvider();

      const provifyContract = new Contract(
        CONTRACT_ADDRESS,
        contract.abi,
        alchemyProvider
      )

      const proof = await provifyContract.proofs(proofId);

      setAddress(proof[2]);
      return true;
    },
    enabled: proofId.length > 0
  });

  return { address, isSuccess, isFetching, isError };
}

export default useVerifyProof;  