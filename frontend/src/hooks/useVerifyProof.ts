import { useAlchemy } from "@/contexts/AlchemyContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import envs from "@/envs";

const useVerifyProof = (proofId: number, address: string) => {
  const alchemy = useAlchemy();
  const [verified, setVerified] = useState<boolean>();
  const { CONTRACT_ADDRESS } = envs;

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["verify_proof", proofId],
    queryFn: async () => {
      const tokenMetadata = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, proofId);

      const mintAddress = tokenMetadata.mint?.mintAddress;

      setVerified(mintAddress === address);

      return true;
    },
    enabled: proofId > 0
  });

  return { verified, isSuccess, isFetching, isError };
}

export default useVerifyProof;  