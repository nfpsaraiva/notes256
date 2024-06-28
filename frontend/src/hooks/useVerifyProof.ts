import { useAlchemy } from "@/contexts/AlchemyContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useVerifyProof = (proofId: number) => {
  const alchemy = useAlchemy();
  const [verified, setVerified] = useState<boolean>();

  const {isSuccess, isFetching, isError} = useQuery({
    queryKey: ["verify_proof", proofId],
    queryFn: async () => {
      const tokenMetadata = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, proofId);

      const mintAddress = tokenMetadata.mint?.mintAddress;

      setVerified(mintAddress !== undefined);

      return true;
    },
    enabled: proofId > 0
  });

  return {verified, isSuccess, isFetching, isError};
}

export default useVerifyProof;  