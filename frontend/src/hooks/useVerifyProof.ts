import { useAlchemy } from "@/contexts/AlchemyContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import envs from "@/envs";

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

      const tokenMetadata = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, Number(proofId));

      const mintAddress = tokenMetadata.mint?.mintAddress;

      if (mintAddress === undefined) {
        setAddress(null);
        return false;
      }

      setAddress(mintAddress);
      return true;
    },
    enabled: proofId.length > 0
  });

  return { address, isSuccess, isFetching, isError };
}

export default useVerifyProof;  